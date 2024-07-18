import React from 'react';
import PropTypes from 'prop-types';

const SelectFilter = ({ label, options, value, onChange, version }) => {
  // Détermination des styles en fonction de la version choisie
  let baseStyle = 'w-full px-4 py-2 border rounded-t-lg focus:outline-none text-gray-800';
  let versionStyle = '';
  let labelStyle = 'block mb-1 font-semibold text-gray-700';
  let arrowStyle = 'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700';

  switch (version) {
    case 'primary':
      versionStyle = 'border-primaryColor bg-primaryColor focus:border-primaryColo text-gray-700';
      break;
    case 'secondary':
      versionStyle = 'border-secondaryColor bg-secondaryColor focus:border-secondaryColor text-gray-700';
      break;
    case 'success':
      versionStyle = 'border-gray-300 bg-green-400 focus:border-green-500 text-gray-800';
      break;
    case 'danger':
      versionStyle = 'border-gray-300 bg-red-400 focus:border-red-500';
      break;
    default:
      versionStyle = 'border-gray-300 focus:border-blue-500';
      break;
  }

  return (
    <div className="mb-4 relative">
      {label && <label className={labelStyle}>{label}</label>}
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className={`${baseStyle} ${versionStyle}`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className={arrowStyle}>
          <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12l-6-6H4l6 6 6-6h-1l-6 6z"/></svg>
        </div>
      </div>
    </div>
  );
};

SelectFilter.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  version: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger']),
};

export default SelectFilter;
