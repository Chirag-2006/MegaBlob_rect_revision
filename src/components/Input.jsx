import { useId, useState } from "react";
import { Buttton } from "./index";
import { Eye, EyeOff } from "lucide-react";

function Input({ label, type = "text", ref, className = "", ...props }) {
  const id = useId();
  const isPasswordField = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      {label && (
        <label htmlFor={id} className="inline-block ml-1 pl-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={isPasswordField ? (showPassword ? "text" : "password") : "text"}
          className={`w-full px-3 py-2  ${isPasswordField ? "pr-12" : ""} rounded-lg bg-white text-black outline-none focus:bg-gray-200 border border-gray-200  ${className}`}
          ref={ref}
          {...props}
          id={id}
        />
        {isPasswordField && (
          <Buttton
            bgColor="bg-transparent"
            textColor="text-gray-600"
            className="absolute right-1 top-1/2 -translate-y-1/2 p-2"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </Buttton>
        )}
      </div>
    </div>
  );
}

export default Input;
