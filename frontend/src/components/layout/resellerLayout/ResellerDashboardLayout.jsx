import React from 'react';
import { Outlet } from 'react-router-dom';
import ResellerSidebar from './ResellerSidebar';
import ResellerHeader from './ResellerHeader';


const ResellerDashboardLayout = () => {
  return (
    <div className="flex flex-row bg-neutral h-screen w-screen overflow-hidden ">
      <ResellerSidebar/>
      <div className="flex flex-col flex-1 overflow-hidden">
        <ResellerHeader className="fixed w-full top-0 z-10" />
        <div className=" pl-8  p-4 overflow-auto ml-12 ">
          <Outlet />
        </div>
      </div>
      
    </div>
  );
};

export default ResellerDashboardLayout;
