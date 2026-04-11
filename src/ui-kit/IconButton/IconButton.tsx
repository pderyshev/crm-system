import { type ButtonHTMLAttributes, type FC, type ReactNode, } from "react";

import "./iconButton.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  variant?: "primary" |  "danger" | "default";
}

export const IconButton: FC<ButtonProps> = ({
  icon,
  children,
  type = "button",
  disabled = false,
  variant = "default",
  ...props
}) => {
  const variantClass = variant !== "default" ? `icon-button--${variant}` : "";

  return (
    <button
      {...props}
      className={`icon-button ${variantClass}`.trim()}
      type={type}
      disabled={disabled}
    >
      {icon && <span className="button__icon">{icon}</span>}
      {children}
    </button>
  );
};