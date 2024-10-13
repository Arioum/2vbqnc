import axios from "axios";
import { useEffect, useState } from "react";
import Widget from "../components/Widget";

// Define the type for a single booking
export interface Booking {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  totalCost: number;
  userId: string;
}

// Define the type for bookings data returned from the API
export interface BookingData {
  bookingStats: Array<{
    value: number;
    title: string;
  }>;
  allBookings: Booking[];
}

const Bookings: React.FC = () => {
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  useEffect(() => {
    const getBookingData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/get-all-bookings`, {
          withCredentials: true,
        });
        setBookingData(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };

    getBookingData();
  }, []);

  if (!bookingData) {
    return <h2>Loading...</h2>;
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-5">
      <span className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Bookings</h1>
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {bookingData.bookingStats.map((stat, index) => (
          <Widget key={index} title={stat.title} value={stat.value} />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {bookingData.allBookings.map((booking) => (
          <div key={booking._id} className="border rounded-md p-2 grid grid-cols-1 gap-1">
            <p className="truncate">
              <span className="font-semibold">Booking ID:</span> {booking._id}
            </p>
            <p className="truncate">
              <span className="font-semibold">User ID:</span> {booking.userId}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Name:</span> {booking.firstName} {booking.lastName}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Email:</span> {booking.email}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Guests:</span> {booking.adultCount} Adults, {booking.childCount} Children
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Total Cost: ₹</span>
              {booking.totalCost}
            </p>
            <p className="text-gray-400 text-sm">
              <span className="font-semibold">Check-In:</span> {formatDate(booking.checkIn)}
            </p>
            <p className="text-gray-400 text-sm">
              <span className="font-semibold">Check-Out:</span> {formatDate(booking.checkOut)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
