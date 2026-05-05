export interface InputProps {
  value: string;
  onChange: (value: string) => void;
  error: string;
  placeholder?: string;
}


export const TodoInput = ({ value, onChange, error, placeholder }: InputProps) => {
  return (
    <div className="todo-form__wrapper">
      <input
        className="todo-form__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {error && <p className="todo-form__error">{error}</p>}
    </div>
  );
};