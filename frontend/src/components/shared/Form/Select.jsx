import React from 'react';

const Select = ({ label, options, value, onChange }) => {
  return (
    <div className='flex flex-col mt-3'>
      <label>{label}</label>
      <select
        className='py-1 px-2 rounded-md my-1'
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
