import React from 'react';

const Checkbox = ({ label, checked, onChange, disabled = false }) => {
  return (
    <label 
      className={`flex items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={{ userSelect: 'none' }} // Prevents text selection
    >
      <input
        type='checkbox'
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className='form-checkbox h-4 w-4 text-primaryColor transition duration-150 ease-in-out'
        style={{ margin: 0 }} // Remove default margin
      />
      <span 
        className={`ml-2 ${disabled ? 'text-gray-500' : 'text-gray-900'}`}
      >
        {label}
      </span>
    </label>
  );
};

export default Checkbox;
