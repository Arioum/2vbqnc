import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
import Button from "./ui/Button";
import Logo from "./ui/Logo";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="overflow-x-clip">
      <div className="p-5 md:container mx-auto flex justify-between">
        <Logo />
        <span className="flex md:space-x-2">
          {isLoggedIn ? (
            <>
              <Link className="flex items-center text-[#F9F9F8] px-3 font-bold hover:text-slate-200" to="/dashboard">
                Dashboard
              </Link>
              <Link className="flex items-center text-[#F9F9F8] px-3 font-bold hover:text-slate-200" to="/all-users">
                Users
              </Link>
              <Link className="flex items-center text-[#F9F9F8] px-3 font-bold hover:text-slate-200" to="/all-listings">
                All Listings
              </Link>
              <Link className="flex items-center text-[#F9F9F8] px-3 font-bold hover:text-slate-200" to="/bookings">
                Bookings
              </Link>
              <Link className="flex items-center text-[#F9F9F8] px-3 font-bold hover:text-slate-200" to="/sales">
                Sales
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Button variant="link" to="/sign-in" className="bg-white text-blue-600 hover:bg-slate-100">
              Sign In
            </Button>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
