import { type ButtonHTMLAttributes, type FC, type ReactNode,} from "react";

import "./iconButton.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
}

export const IconButton: FC<ButtonProps> = ({
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
    className={`icon-button ${className}`.trim()} 
    type={type} 
    disabled={disabled}   
    >
      {icon && <span className="button__icon">{icon}</span>}
      {children}
    </button>
  );
};