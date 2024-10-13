import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";

interface Props {
  children: React.ReactNode;
}

// flex-1 means acquire all the free space
const Layout = ({ children }: Props) => {
  const { pathname } = useLocation();
  const showSearch = pathname !== "/register" && pathname !== "/sign-in";

  return (
    <div className="min-h-screen">
      <div className="bg-blue-600 bg-no-repeat bg-cover bg-center w-full h-auto">
        <Header />
        <Hero />
      </div>
      <div className="p-5 md:container mx-auto">{showSearch && <SearchBar />}</div>
      <div className="p-5 md:container mx-auto py-10 pb-24 flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
