import { ReactNode } from "react";

interface ButtonProps {
  btnType?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  label?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  title?: string;
}

const Button: React.FC<ButtonProps> = ({
  btnType = "btn-primary-outline",
  iconLeft,
  iconRight,
  label = "Click me",
  onClick,
  className = "",
  disabled = false,
  type = "button",
  title,
}) => {
  return (
    <button
      className={`flex items-center justify-center ${label === '' ? 'gap-0' : 'gap-2' } px-4 py-2 rounded-md ${btnType} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      title={title}
    >
      {iconLeft && <span>{iconLeft}</span>}
      <span>{label}</span>
      {iconRight && <span>{iconRight}</span>}
    </button>
  );
};

export default Button;
