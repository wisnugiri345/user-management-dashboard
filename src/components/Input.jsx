import { useState } from "react";
import PropTypes from "prop-types";

export const Input = ({ label, type = "text", name, value, onChange, placeholder, validate, ...props }) => {
  const [error, setError] = useState("");

  const handleBlur = () => {
    if (validate) {
      const errorMessage = validate(value);
      setError(errorMessage);
    }
  };

  return (
    <div className="flex w-full flex-col">
      {label && <label className="block text-gray-700 font-medium mb-1">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => {
          setError("");
          onChange(e);
        }}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`w-full px-2 py-3 rounded-[6px] text-xs bg-[#F4F2FF] hover:border-1 hover:border-[#6E6893]  text-[#6E6893] outline-none ${error ? "border-red-500" : ""}`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  validate: PropTypes.func,
};
