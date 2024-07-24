import React from 'react';

const Textarea = ({ label, value, onChange }) => {
  return (
    <div className='flex flex-col'>
      <label>{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        className='py-1 px-2 rounded-md my-1'
        rows='4'
      />
    </div>
  );
};

export default Textarea;
