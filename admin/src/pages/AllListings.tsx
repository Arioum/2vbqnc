import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import Button from "../components/ui/Button";

// Define the maximum length for descriptions
const MAX_DESCRIPTION_LENGTH = 340;

const AllListings = () => {
  const { data: hotelData } = useQuery("fetchMyHotels", apiClient.fetchMyHotels, {
    onError: () => {},
  });

  if (!hotelData) {
    return <span>No Hotel Found</span>;
  }

  const truncateDescription = (description: string) => {
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      return `${description.substring(0, MAX_DESCRIPTION_LENGTH)}...`;
    }
    return description;
  };

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">All Listings</h1>
        <Link
          to="/add-hotel"
          className="flex justify-center items-center text-[#F9F9F8] p-3 px-10 font-bold rounded-[4px] bg-blue-600 hover:bg-blue-700"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {hotelData.map((hotel, index) => (
          <div
            key={index}
            className="flex flex-col border border-slate-300 rounded-lg shadow-md p-4 gap-5 transition-shadow hover:shadow-lg"
          >
            <div className="flex gap-6">
              {hotel.imageUrls.length > 0 && (
                <img src={hotel.imageUrls[0]} alt={hotel.name} className="max-w-[300px] w-[100%] h-36 object-cover rounded-md" />
              )}
              <div className="">
                <h2 className="text-2xl font-bold mb-2">{hotel.name}</h2>
                <p className="text-gray-700 whitespace-pre-line">{truncateDescription(hotel.description)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-[4px] p-3 flex items-center">
                <BsMap className="mr-1" />
                {hotel.city}, {hotel.country}
              </div>
              <div className="border border-slate-300 rounded-[4px] p-3 flex items-center">
                <BsBuilding className="mr-1" />
                {hotel.type}
              </div>
              <div className="border border-slate-300 rounded-[4px] p-3 flex items-center gap-1">
                <BiMoney className="mr-1" />
                <span className="font-semibold">&#8377; {hotel.pricePerNight.toLocaleString()}</span>
                <> / night</>
              </div>
              <div className="border border-slate-300 rounded-[4px] p-3 flex items-center">
                <BiHotel className="mr-1" />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className="border border-slate-300 rounded-[4px] p-3 flex items-center">
                <BiStar className="mr-1" />
                {hotel.starRating} Star Rating
              </div>
            </div>

            <span className="flex justify-end">
              <Button
                variant="link"
                to={`/edit-hotel/${hotel._id}`}
                className="flex text-[#F9F9F8] text-xl font-bold p-2"
              >
                Edit Details
              </Button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllListings;
