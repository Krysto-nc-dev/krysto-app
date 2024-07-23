import React from 'react';
import { Outlet } from 'react-router-dom';

import PartnerSidebar from './PartnerSidebar';
import PartnerHeader from './PartnerHeader';

const PartnerDashboardLayout = () => {
  return (
    <div className="flex flex-row bg-neutral h-screen w-screen overflow-hidden ">
      <PartnerSidebar/>
      <div className="flex flex-col flex-1 overflow-hidden">
        <PartnerHeader className="fixed w-full top-0 z-10" />
        <div className=" pl-8  p-4 overflow-auto ml-12 ">
          <Outlet />
        </div>
      </div>
      
    </div>
  );
};

export default PartnerDashboardLayout;
