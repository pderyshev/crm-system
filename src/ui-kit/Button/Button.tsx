import { type ButtonHTMLAttributes, type FC, } from "react";

import "./button.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export const Button: FC<ButtonProps> = ({
  label,
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
      {label && <span className="button__label">{label}</span>}
      {children}
    </button>
  );
};