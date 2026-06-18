import { useId } from "react";

export default function Select({
  label,
  className = "",
  options = [],
  ...props
}) {
  const id = useId();

  return (
    <div className="w-full">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        {...props}
        id={id}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
