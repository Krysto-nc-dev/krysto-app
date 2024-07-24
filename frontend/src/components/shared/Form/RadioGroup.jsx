import React from 'react';

const RadioGroup = ({ name, options, value, onChange }) => {
  return (
    <div className="space-y-2 mt-2">
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center cursor-pointer"
          style={{ userSelect: 'none' }} // Prevents text selection
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
            className="form-radio h-4 w-4 text-primaryColor transition duration-150 ease-in-out"
            style={{ margin: 0 }} // Remove default margin
          />
          <span className="ml-2 text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
