import Logo from "./ui/Logo";

const Footer = () => {
  return (
    <div className="bg-blue-600 py-12">
      <div className="p-5 md:container mx-auto flex justify-between items-center">
        <span className="flex flex-col">
          <Logo />
        </span>
        <span className="text-[#F9F9F8] font-bold tracking-tight flex flex-col md:flex-row gap-2 md:gap-4">
          <p className="cursor-pointer text-center">Privacy Policy</p>
          <p className="cursor-pointer">Terms of service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
