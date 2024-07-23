import { AlignJustify, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DASHBOARD_RESELLER_SIDEBAR_LINKS } from './ResellerNavigation';



const ResellerSidebar = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar open/close

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <aside className={`bg-gray-800 p-3  text-gray-100 h-full absolute top-0 left-0 transition-all duration-300 ease-in-out z-50 ${isSidebarOpen ? 'w-55' : 'w-15'}`}>
    
      <div className="flex items-center justify-between   ">
        {/* Menu icon to toggle sidebar */}
        <button onClick={toggleSidebar} className="text-secondaryColor focus:outline-none">
          {isSidebarOpen ? (
            <X className="text-red-600 mt-2" size="25" />
          ) : (
            <AlignJustify className='text-gray-200 ml-[1px] mt-2' size="25" />
          )}
        </button>
        
      </div>
      {!isSidebarOpen && (
        <div className="mt-9">
          {DASHBOARD_RESELLER_SIDEBAR_LINKS.map((link) => (
            <Link
              to={link.href}
              key={link.key}
              className={`flex items-center text-center gap-2 mb-[20px] px-1 py-1 rounded-lg text-[10px] text-gray-800 ${
                location.pathname === link.href
                  ? 'bg-lightColor text-gray-800 bg-primaryColor'
                  : 'text-primaryColor font-bold'
              } hover:bg-secondaryColor hover:text-gray-800`}
            >
              <span className='icon-size-adjusted'>

              {link.icon}
              </span>
            </Link>
          ))}
        </div>
      )}
      {isSidebarOpen && (
        <div className="flex-1 mt-9 ">
          {DASHBOARD_RESELLER_SIDEBAR_LINKS.map((link) => (
            <Link
              to={link.href}
              key={link.key}
              className={`flex items-center gap-2 mb-[20px] px-1 py-1 rounded-lg text-[10px] ${
                location.pathname === link.href
                      ? 'bg-lightColor text-gray-800 bg-primaryColor font-bold'
                  : 'text-gay-800 font-bold'
              } hover:bg-secondaryColor hover:text-backgroundColor`}
            >
              <span className='icon-size-adjusted'>

              {link.icon}
              </span>
              <span >{link.label}</span>
            </Link>
          ))}
        </div>
      )}
    </aside>
  );
};

export default ResellerSidebar;
