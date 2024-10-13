import { Hotel } from '../models/hotel';
import Transaction from '../models/transaction';
import { User } from '../models/user';
import { Request, Response } from 'express';
import { startOfWeek, endOfWeek } from 'date-fns'; // Helper to get the start and end of the week

export const getDashboardDetails = async (req: Request, res: Response) => {
  try {
    // Fetch general counts
    const hotels = await Hotel.find();
    const hotelCount = hotels.length;
    const bookingsCount = hotels.reduce(
      (sum, hotel) => sum + hotel.bookings.length,
      0
    );

    const userCount = await User.countDocuments();
    // Calculate total revenue
    const transactions = await Transaction.find();

    // Lifetime sales amount
    const lifetimeSales = transactions.reduce(
      (sum, txn) => sum + txn.totalAmount,
      0
    );

    // Sales for the current week
    const startOfCurrentWeek = startOfWeek(new Date()); // Start of the week (e.g., Monday)
    const endOfCurrentWeek = endOfWeek(new Date()); // End of the week (e.g., Sunday)

    const weeklySales = await Transaction.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfCurrentWeek,
            $lte: endOfCurrentWeek,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$totalAmount' },
        },
      },
    ]);

    // const dashboardData = {
    //   userCount,
    //   hotelCount,
    //   bookingsCount,
    //   lifetimeSales,
    //   weeklySales: weeklySales[0]?.total || 0, // Handle case when no transactions are found
    // };
    const dashboardData = [
      {
        value: userCount,
        title: 'Total Users',
      },
      {
        value: hotelCount,
        title: 'Listed Hotels',
      },
      {
        value: bookingsCount,
        title: 'Total Bookings',
      },
      {
        value: lifetimeSales,
        title: 'Lifetime sales',
      },
    ];

    res.status(200).json(dashboardData);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching dashboard details' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, { password: 0 });

    if (!users) {
      return res.status(200).json({ message: 'No users found', users: [] });
    }

    res.status(200).json({ message: 'Users found', users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};
