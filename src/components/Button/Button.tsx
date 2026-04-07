import { type ButtonHTMLAttributes, type FC, type ReactNode,} from "react";

import "./button.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  label,
  icon,
  children,
  type = "button",
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <button
    {...props}
    className={`button ${className}`.trim()} 
    type={type} 
    disabled={disabled}   
    >
      {icon && <span className="button__icon">{icon}</span>}
      {label && <span className="button__label">{label}</span>}
      {children}
    </button>
  );
};