import 'dotenv/config';
import './db/connection';
import express, { Request, Response } from 'express';
import cors from 'cors';
import userRoutes from './routes/users';
import adminRoutes from './routes/admin'
import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary'; // v2 is a SDK
import myHotelRoutes from './routes/my-hostels';
import hotelRoutes from './routes/hotels';
import bookingRoutes from './routes/my-bookings';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express(); // creating an app
app.use(cookieParser()); // use cookie parser to parse or read the cookie
app.use(express.json()); // body of Api will convert into json
app.use(express.urlencoded({ extended: true })); // for parsing the url(params etc)

const allowedOrigins = [process.env.FRONTEND_URL, process.env.ADMIN_URL];
app.use(
  cors({
    origin: function (origin, callback) {
      // If the origin is in the allowedOrigins array or it's undefined (for non-browser clients), allow it
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // allow credentials like cookies to be sent
  })
);
app.use(express.static(path.join(__dirname, '../../frontend/dist'))); // express can serve static assets
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/my-hotels', myHotelRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/my-bookings', bookingRoutes);

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
}); // all the other routes will go to index.html

app.listen(7000, () => {
  console.log('Server is running on localhost:7000');
});
