import React from "react";

const Input = ({
  properties: { type, name, placeholder, value },
  handleChange,
}) => {
  return (
    <p>
      <input
        type={type}
        name={name}
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </p>
  );
};

export default Input;
