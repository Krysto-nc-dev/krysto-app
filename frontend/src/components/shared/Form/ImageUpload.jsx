import React, { useState } from 'react';

const ImageUpload = ({ label, onChange, multiple = false }) => {
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Si 'multiple' est false, on garde seulement un fichier
    if (!multiple) {
      const file = files[0];
      if (file) {
        setPreviews([URL.createObjectURL(file)]);
        if (onChange) onChange([file]);
      }
    } else {
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
      if (onChange) onChange(files);
    }
  };

  const handleRemoveImage = (index) => {
    setPreviews(prev => {
      const newPreviews = [...prev];
      URL.revokeObjectURL(newPreviews[index]);
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  };

  return (
    <div className='flex flex-col items-center'>
      <label className='mb-2 font-bold'>{label}</label>
      <div className='relative'>
        <input
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          id='file-upload'
          className='absolute inset-0 opacity-0 cursor-pointer'
          multiple={multiple}
        />
        <label
          htmlFor='file-upload'
          className='bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-600'
        >
          {multiple ? 'Choisir des fichiers' : 'Choisir un fichier'}
        </label>
      </div>
      <div className='mt-2 flex flex-wrap gap-2'>
        {previews.map((preview, index) => (
          <div key={index} className='relative'>
            <img
              src={preview}
              alt={`Preview ${index}`}
              className='w-32 h-32 object-cover border rounded shadow-md'
            />
            <button
              type='button'
              onClick={() => handleRemoveImage(index)}
              className='absolute top-0 right-0 m-1 bg-red-500 text-white rounded-full p-1'
              aria-label='Supprimer'
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
