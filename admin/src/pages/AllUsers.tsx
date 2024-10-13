import axios from "axios";
import { useEffect, useState } from "react";

export interface UserData {
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  _id: string;
}

const AllUsers: React.FC = () => {
  const [allUsers, setAllUsers] = useState<UserData[] | null>(null);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/all-users`, {
          withCredentials: true,
        });
        setAllUsers(res.data.users);
        console.log(res.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getAllUsers();
  }, []);

  if (!allUsers) {
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
        <h1 className="text-3xl font-bold">All Users</h1>
      </span>
      <div className="border rounded-md p-2">
        {allUsers.map((user) => (
          <div key={user._id} className="grid grid-cols-1 lg:grid-cols-4 lg:gap-4 items-center">
            <p className="font-semibold truncate">{user._id}</p>
            <p className="font-semibold">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-400 text-sm flex lg:justify-end">{formatDate(user.createdAt)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
