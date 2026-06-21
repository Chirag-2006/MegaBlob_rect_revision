import { useId } from "react";

function Input({ label, type = "text", ref, className = "", ...props }) {

  const id = useId();
  return (
    <div>
      {label && (
        <label htmlFor={id} className="inline-block ml-1 pl-1">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-200 border border-gray-200  ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
}

export default Input;
