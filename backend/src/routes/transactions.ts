import Transaction from '../models/transaction';
import { Request, Response } from 'express';
import { startOfDay, endOfDay } from 'date-fns';

export const getTransactionData = async (req: Request, res: Response) => {
  try {
    // Fetch transactions sorted by most recent first
    const transactions = await Transaction.find().sort({ createdAt: -1 });

    // Calculate lifetime sales amount
    const lifetimeSales = transactions.reduce(
      (sum, txn) => sum + txn.totalAmount,
      0
    );

    // Define the start and end of the current day
    const startOfCurrentDay = startOfDay(new Date());
    const endOfCurrentDay = endOfDay(new Date());

    // Calculate daily sales amount
    const dailySales = await Transaction.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfCurrentDay,
            $lte: endOfCurrentDay,
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

    // Prepare sales data
    const salesAmount = [
      {
        value: dailySales[0]?.total || 0,
        title: 'Daily Sales',
      },
      {
        value: lifetimeSales,
        title: 'Lifetime Sales',
      },
    ];

    // Respond with the sales data and transactions
    res.status(200).json({ salesAmount, transactions });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching dashboard details' });
  }
};
