import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
// import { VscDebugRestart } from "react-icons/vsc";

const SearchBar = () => {
  const search = useSearchContext();
  const navigate = useNavigate();
  // local state to avoid unneccessary re-rendering
  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(destination, checkIn, checkOut, adultCount, childCount);
    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  // const clearSearch = () => {
  //   setDestination("");
  //   setCheckIn(minDate);
  //   setCheckOut(minDate);
  //   setAdultCount(1);
  //   setChildCount(1);
  //   search.saveSearchValues(destination, checkIn, checkOut, adultCount, childCount);

  //   navigate("/search");
  // };

  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-14 p-3 bg-white rounded-[8px] shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4"
    >
      <div className="flex flex-row items-center flex-1 bg-slate-50 border rounded-[4px] p-2">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          placeholder="Where are you going?"
          className="text-md w-full focus:outline-none bg-slate-50"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <div className="flex bg-slate-50  border rounded-[4px] px-2 py-1 gap-2">
        <label className="items-center flex">
          Adults:
          <input
            className="w-full p-1 focus:outline-none font-bold bg-slate-50"
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </label>
        <label className="items-center flex">
          Children
          <input
            className="w-full p-1 focus:outline-none font-bold bg-slate-50"
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </label>
      </div>
      <div>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="min-w-full bg-slate-50 border rounded-[4px] p-2 focus:outline-none "
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="overflow-clip">
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-out Date"
          className="min-w-full bg-slate-50 border rounded-[4px] p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="flex h-full gap-1">
        <button
          type="submit"
          className="w-full text-white bg-blue-600 text-slabg-slate-50 border rounded-[4px] h-full p-2 font-bold text-xl hover:bg-blue-600"
        >
          Search
        </button>
        {/* <button
          onClick={clearSearch}
          className=" bg-red-600 text-slabg-slate-50 w-[50px] flex justify-center items-center rounded-[4px] h-full p-2 font-bold text-xl hover:bg-red-500"
        >
          <VscDebugRestart className="text-white"/>
        </button> */}
      </div>
    </form>
  );
};

export default SearchBar;
