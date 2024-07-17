import React from 'react';

const Table = ({ headers, data, version = 'primary' }) => {
  const baseStyle = 'min-w-full border border-gray-200';
  const versionStyle = version === 'primary' ? 'bg-white' : 'bg-gray-200';
  const headerStyle = version === 'primary' ? 'bg-gray-700 text-primaryColor font-bold' : 'bg-gray-700 text-secondaryColor font-bold';
  const rowHoverStyle = version === 'primary' ? 'hover:bg-primaryColor' : 'hover:bg-secondaryColor';

  return (
    <div className="overflow-x-auto">
      <table className={`${baseStyle} ${versionStyle}`}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className={`px-4 py-2 border-b border-gray-200 ${headerStyle} text-left text-sm font-semibold text-gray-700`}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={`${rowHoverStyle}`}>
              {headers.map((header, colIndex) => (
                <td key={colIndex} className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
