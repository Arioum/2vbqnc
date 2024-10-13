import { Link } from "react-router-dom";

interface ButtonProps {
  variant?: "button" | "link";
  children: React.ReactNode;
  to?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button = ({ variant = "button", children, to, className, onClick, disabled, type }: ButtonProps) => {
  if (variant === "link") {
    return (
      <Link
        to={to || "#"}
        className={`flex items-center text-[#F9F9F8] px-3 h-full font-bold rounded-[4px] bg-blue-600 hover:bg-blue-700 ${className}`}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`flex items-center text-[#F9F9F8] px-3 h-full font-bold rounded-[4px] bg-blue-600 hover:bg-blue-700 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
