import React from 'react';

const Input = ({
  type = 'text',
  id,
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  className = '',
  ...props
}) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={className}
      {...props}
    />
  );
};

export default Input;
