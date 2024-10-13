import Header from "../components/Header";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen">
      <div className="bg-blue-600 bg-no-repeat bg-cover bg-center w-full h-auto">
        <Header />
      </div>
      <div className="p-5 md:container mx-auto py-10 pb-24 flex-1">{children}</div>
    </div>
  );
};

export default Layout;
