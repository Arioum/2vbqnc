import express, { Request, Response } from 'express';
import { Admin } from '../models/user';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import verifyToken from '../middlewares/auth';
import { getAllUsers, getDashboardDetails } from './dashboard';
import { getTransactionData } from './transactions';
import { deleteHotel, getAllBookings, getBookingsWithHotelDetails } from './extras';

const router = express.Router();

router.get(
  '/auth/validate-token',
  verifyToken,
  (req: Request, res: Response) => {
    res.status(200).send({ userId: req.userId });
  }
);

router.post('/auth/logout', (req: Request, res: Response) => {
  res.cookie('auth_token', '', {
    expires: new Date(0),
  }); // overwrite the token with this invalid token
  res.send();
});

router.post(
  '/auth/login',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password with 6 or more character required').isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await Admin.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid Credentials' });
      }
      const isMatch = await bcrypt.compare(password, user.password); // encrypt the body password and then compare
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid Credentials' }); // be generic
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: '1d' }
      );
      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400000,
      });

      res.status(200).json({ userId: user._id }); // user id for frontend as it can't acces token
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
);

router.get('/me', verifyToken, async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const admin = await Admin.findById(userId).select('-password');
    if (!admin) {
      return res.status(400).json({ message: 'Admin not found' });
    }
    res.json(admin);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'something went wrong' });
  }
});

// /api/admin/register
router.post(
  '/register',
  [
    check('firstName', 'First Name is required').isString(),
    check('lastName', 'Last Name is required').isString(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password with 6 or more characters required').isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      let admin = await Admin.findOne({
        email: req.body.email,
      });

      if (admin) {
        res.status(400).json({ message: 'User already exists' }); //bad request
      }

      admin = new Admin(req.body);
      await admin.save();
      const token = jwt.sign(
        { userId: admin.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: '1d',
        }
      );

      res.cookie('auth_token', token, {
        // name, token
        httpOnly: true, // can only be access on the server (you can access from the js code on the browser)
        secure: process.env.NODE_ENV === 'production', //accept cookies only on https(useful in production)
        maxAge: 86400000,
      });

      return res.status(200).send({ message: 'User created Successfully' });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Something went wrong' });
      //don't return error message to frontend as it can have a sensitive information just log in the backend
    }
  }
);

router.get('/dashboard', verifyToken, getDashboardDetails);
router.get('/all-users', verifyToken, getAllUsers);
router.get('/get-transactions', verifyToken, getTransactionData);
router.delete('/delete-hotel/:hotelId', verifyToken, deleteHotel);
router.get('/get-all-bookings', verifyToken, getAllBookings);
router.get('/bookings-with-hotels', verifyToken, getBookingsWithHotelDetails);

export default router;
