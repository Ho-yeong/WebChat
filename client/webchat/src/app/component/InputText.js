import React from 'react';

export const InputText = ({ type, placeholder, onChange, defalutValue }) => {
  return (
    <input
      type={type ? type : 'text'}
      placeholder={placeholder ? placeholder : ''}
      onChange={(e) => onChange(e.target.value)}
      value={defalutValue}
    />
  );
};
