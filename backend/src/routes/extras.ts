import { Request, Response } from 'express';
import { Hotel } from '../models/hotel';
import { startOfDay, endOfDay } from 'date-fns';

export const deleteHotel = async (req: Request, res: Response) => {
  try {
    const { hotelId } = req.params;
    const hotel = await Hotel.findByIdAndDelete({ _id: hotelId });
    console.log('hotel');

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found.' });
    }

    res.status(200).json({ message: 'Hotel deleted successfully.' });
  } catch (error) {
    console.error('Error deleting hotel:', error);
    res.status(500).json({ message: 'Error deleting hotel.' });
  }
};

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    // Extract the optional 'limit' query parameter, default to no limit if not provided
    const limit = parseInt(req.query.limit as string) || null;

    // Fetch bookings from all hotels and flatten them into one array
    const hotels = await Hotel.find({}, 'bookings');
    let allBookings = hotels.flatMap((hotel) => hotel.bookings);

    // Sort bookings by most recent check-in date first
    allBookings = allBookings.sort(
      (a, b) => b.checkIn.getTime() - a.checkIn.getTime()
    );

    // Apply limit if provided
    if (limit) {
      allBookings = allBookings.slice(0, limit);
    }

    // Calculate total bookings count
    const totalBookingsCount = allBookings.length;

    // Get the start and end of the current day
    const startOfCurrentDay = startOfDay(new Date());
    const endOfCurrentDay = endOfDay(new Date());

    // Filter bookings for today
    const todayBookings = allBookings.filter(
      (booking) =>
        booking.checkIn >= startOfCurrentDay &&
        booking.checkIn <= endOfCurrentDay
    );

    // Count today's bookings
    const todayBookingsCount = todayBookings.length;

    // Prepare booking statistics
    const bookingStats = [
      { title: "Today's Bookings", value: todayBookingsCount },
      { title: 'Total Bookings', value: totalBookingsCount },
    ];

    // Send response
    res.status(200).json({ bookingStats, allBookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings.' });
  }
};

export const getBookingsWithHotelDetails = async (
  req: Request,
  res: Response
) => {
  try {
    const limit = parseInt(req.query.limit as string) || 5;

    const hotelsWithBookings = await Hotel.aggregate([
      { $unwind: '$bookings' }, // Flatten bookings array
      {
        $project: {
          _id: 1,
          name: 1,
          city: 1,
          country: 1,
          'bookings._id': 1,
          'bookings.firstName': 1,
          'bookings.lastName': 1,
          'bookings.email': 1,
          'bookings.checkIn': 1,
          'bookings.checkOut': 1,
          'bookings.totalCost': 1,
        },
      },
      { $sort: { 'bookings.checkIn': -1 } }, // Sort by recent check-in dates
      { $limit: limit }, // Apply the limit to the flattened list
    ]);

    res.status(200).json(hotelsWithBookings);
  } catch (error) {
    console.error('Error fetching bookings with hotel details:', error);
    res
      .status(500)
      .json({ message: 'Error fetching bookings with hotel details.' });
  }
};
