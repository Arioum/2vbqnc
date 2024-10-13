import { Link } from "react-router-dom";

interface WidgetProps {
  title: string;
  value: number;
  linkTo?: {
    link: string;
    icon: React.ReactNode;
  };
  amount?: boolean;
}

const Widget: React.FC<WidgetProps> = ({ title, value, linkTo, amount }) => {
  if (linkTo == undefined) {
    return (
      <article className="flex flex-col bg-white border rounded-[8px] p-3 shadow-md transition-shadow hover:shadow-lg">
        <div className="flex gap-2 items-center">
          <h4 className="text-[20px] font-[600]">{title}</h4>
        </div>
        <h5 className="text-[30px] font-[800]">
          {amount && "₹"}
          {value}
        </h5>
      </article>
    );
  }
  return (
    <Link
      to={linkTo.link}
      className="flex flex-col bg-white border rounded-[8px] p-3 shadow-md transition-shadow hover:shadow-lg"
    >
      <div className="flex gap-2 items-center">
        {linkTo.icon}
        <h4 className="text-[20px] font-[600]">{title}</h4>
      </div>
      <h5 className="text-[30px] font-[800]">{value}</h5>
    </Link>
  );
};

export default Widget;
