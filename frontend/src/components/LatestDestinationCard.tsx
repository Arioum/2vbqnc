import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";
import { FaLocationDot } from "react-icons/fa6";

type Props = {
  hotel: HotelType;
};

const LatestDestinationCard = ({ hotel }: Props) => {
  return (
    <Link to={`/detail/${hotel._id}`} className="relative cursor-pointer overflow-hidden rounded-md">
      <div className="h-[300px]">
        <img src={hotel.imageUrls[0]} className="w-full h-full object-cover object-center" />
      </div>

      <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md flex items-end justify-between">
        <span className="text-white font-bold tracking-tight text-3xl">{hotel.name}</span>
        <span className="text-slate-200 font-bold tracking-tight text-[20px] flex items-center gap-2">
          {hotel.city}
          <FaLocationDot />
        </span>
      </div>
    </Link>
  );
};

export default LatestDestinationCard;
