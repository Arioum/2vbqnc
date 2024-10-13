import { TbSquareRoundedLetterSFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <span className="text-2xl md:text-3xl text-[#F9F9F8] font-bold tracking-tight mr-5">
      <Link to="/" className="flex items-center gap-1 ">
        <TbSquareRoundedLetterSFilled />
        <p className="hidden md:block font-inter text-[24px]">STAYBE</p>
      </Link>
    </span>
  );
};

export default Logo;
