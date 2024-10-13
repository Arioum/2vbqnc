import axios from "axios";
import { useEffect, useState } from "react";
import Widget from "../components/Widget";

// Define the type for a single transaction
export interface Transaction {
  _id: string;
  userId: string;
  hotelId: string;
  totalAmount: number;
  createdAt: string;
}

// Define the type for sales data returned from the API
export interface SalesData {
  salesAmount: Array<{
    value: number;
    title: string;
  }>;
  transactions: Transaction[];
}

const Sales: React.FC = () => {
  const [salesData, setSalesData] = useState<SalesData | null>(null);

  useEffect(() => {
    const getSalesData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/get-transactions`, {
          withCredentials: true,
        });
        setSalesData(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    getSalesData();
  }, []);

  if (!salesData) {
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
        <h1 className="text-3xl font-bold">Sales</h1>
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {salesData.salesAmount.map((sales, index) => (
          <Widget key={index} title={sales.title} value={sales.value} amount/>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {salesData.transactions.map((transaction) => (
          <div key={transaction._id} className="border rounded-md p-2 grid grid-cols-1 gap-1">
            <p className="truncate">
              <span className="font-semibold">Transaction Id:</span> {transaction._id}
            </p>
            <p className="truncate">
              <span className="font-semibold">User Id:</span> {transaction.userId}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Hotel Id:</span> {transaction.hotelId}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Total Amount: ₹</span>
              {transaction.totalAmount}
            </p>
            <p className="text-gray-400 text-sm flex">{formatDate(transaction.createdAt)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sales;
