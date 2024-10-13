import { Link } from "react-router-dom";

interface ButtonProps {
  variant?: "button" | "link";
  children: React.ReactNode;
  to?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const Button = ({ variant = "button", children, to, className, onClick, disabled }: ButtonProps) => {
  if (variant === "link") {
    return (
      <Link
        to={to || "#"}
        className={`flex items-center text-[#F9F9F8] px-3 h-full font-bold rounded-[4px] bg-black hover:bg-black ${className}`}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center text-[#F9F9F8] px-3 h-full font-bold rounded-[4px] bg-black hover:bg-black ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
