import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Button from "./ui/Button";
type Props = {
  hotel: HotelType;
};

const SearchResultsCard = ({ hotel }: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] bg-white  shadow-md transition-shadow hover:shadow-lg border border-slate-300 rounded-lg p-4 gap-8">
      <div className="w-full h-[300px] rounded-md overflow-hidden">
        <img src={hotel.imageUrls[0]} className="w-full h-full object-cover object-center" />
      </div>
      <div className="grid grid-rows-[1fr_1fr_1fr]">
        <div>
          <Link to={`/detail/${hotel._id}`} className="text-2xl font-bold cursor-pointer">
            {hotel.name}
          </Link>
          <div className="flex flex-col justify-center">
            <span className="text-sm bg-[#ff8162] text-white w-fit p-[2px_6px] rounded-md my-2">{hotel.type}</span>
            <span className="flex">
              {Array.from({ length: 5 }).map((_, index) =>
                index < hotel.starRating ? (
                  <AiFillStar key={index} className="fill-yellow-400" />
                ) : (
                  <AiOutlineStar key={index} className="fill-gray-300" />
                )
              )}
            </span>
          </div>
        </div>

        <div>
          <div className="line-clamp-4">{hotel.description}</div>
        </div>

        <div className="grid grid-cols-2 items-end whitespace-nowrap">
          <div className="flex gap-1 flex-wrap items-center">
            {hotel.facilities.slice(0, 3).map((facility) => (
              <span className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap">{facility}</span>
            ))}
            <span className="text-sm">{hotel.facilities.length > 3 && `+${hotel.facilities.length - 3} more`}</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="flex gap-1">
              <span className="font-semibold">&#8377;{hotel.pricePerNight.toLocaleString()}</span>
              <p>night</p>
            </span>

            <Button
              to={`/detail/${hotel._id}`}
              variant="link"
              className="bg-[#33b249] text-[#F9F9F8] h-full p-2 font-bold text-xl max-w-fit hover:bg-[#33c651]"
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
