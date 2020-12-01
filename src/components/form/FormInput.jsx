import React from "react";

const FormInput = ({ id, name, type, label, placeholder, onChange }) => (
  <div className="flex flex-col m-2 items-center sm:flex-row sm:flex-wrap sm:m-4">
    {label ? (
      <label
        htmlFor={id}
        className="w-32 text-center mb-2 sm:text-left sm:pl-1 sm:m-0"
      >
        {label}
      </label>
    ) : (
      ""
    )}

    <input
      type={type}
      onChange={onChange}
      className="w-64 border border-gray-300 rounded-lg outline-none py-1 px-3"
      name={name}
      id={id}
    />
  </div>
);

export default FormInput;
