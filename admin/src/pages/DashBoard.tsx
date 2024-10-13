import { useEffect, useState } from "react";
import axios from "axios";
import Widget from "../components/Widget";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaHotel } from "react-icons/fa";
import { MdBookmark } from "react-icons/md";

export interface DashboardWidget {
  title: string;
  value: number;
}

export interface Booking {
  _id: string;
  guestName: string;
  checkIn: string; // ISO date string
  hotel: {
    name: string;
    city: string;
  };
}

type DashboardData = DashboardWidget[];

const widgetLinks = [
  { link: "/all-users", icon: <FaUser /> },
  { link: "/all-listings", icon: <FaHotel /> },
  { link: "/bookings", icon: <MdBookmark /> },
  { link: "/sales", icon: <FaArrowTrendUp /> },
];

const DashBoard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const res = await axios.get<DashboardData>(`${import.meta.env.VITE_API_BASE_URL}/api/admin/dashboard`, {
          withCredentials: true,
        });
        setDashboardData(res.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    const getRecentBookings = async () => {
      try {
        const res = await axios.get<any[]>(
          `${import.meta.env.VITE_API_BASE_URL}/api/admin/bookings-with-hotels?limit=5`,
          { withCredentials: true }
        );

        const formattedBookings: Booking[] = res.data.map((booking) => ({
          _id: booking._id,
          guestName: `${booking.bookings.firstName} ${booking.bookings.lastName}`,
          checkIn: booking.bookings.checkIn,
          hotel: {
            name: booking.name,
            city: booking.city,
          },
        }));

        setRecentBookings(formattedBookings);
      } catch (error) {
        console.error("Error fetching recent bookings:", error);
      }
    };

    getDashboardData();
    getRecentBookings();
  }, []);

  if (!dashboardData) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {dashboardData.map((data, index) => (
          <Widget key={index} title={data.title} value={data.value} linkTo={widgetLinks[index]} />
        ))}
      </div>

      <div className="pt-6">
        <span className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Recent Bookings</h1>
        </span>

        <ul className="space-y-2 mt-4">
          {recentBookings.map((booking, index) => (
            <li key={index} className="border border-slate-300 rounded-lg p-4 shadow-sm hover:shadow-md transition">
              <h2 className="text-lg font-semibold">{booking.guestName}</h2>
              <p className="text-sm">
                Hotel: <strong>{booking.hotel.name}</strong>, {booking.hotel.city}
              </p>
              <p className="text-sm">Check-in: {new Date(booking.checkIn).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashBoard;
