import React from 'react';

const InputNumber = ({ label, min, max, step, value, onChange }) => {
  return (
    <div className='flex flex-col mt-2'>
      <label>{label}</label>
      <input
        className='py-1 px-2 rounded-md'
        type='number'
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputNumber;
