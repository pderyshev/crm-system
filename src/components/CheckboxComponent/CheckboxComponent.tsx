import { type FC } from "react";
import "./checkbox.scss";

export interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
}

export const CheckboxComponent: FC<CheckboxProps> = ({ checked, onChange }) => {
  return (
    <input
      className="custom-checkbox"
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
  );
};