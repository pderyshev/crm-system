import { type ButtonHTMLAttributes, type FC, } from "react";

import "./button.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  variant?: "primary" | "danger" | "default";
}

export const Button: FC<ButtonProps> = ({
  label,
  children,
  type = "button",
  disabled = false,
  variant = "default",
  ...props
}) => {
  const variantClass = variant !== "default" ? `button--${variant}` : "";

  return (
    <button
    {...props}
    className={`button ${variantClass}`.trim()} 
    type={type} 
    disabled={disabled}   
    >
      {label && <span className="button__label">{label}</span>}
      {children}
    </button>
  );
};