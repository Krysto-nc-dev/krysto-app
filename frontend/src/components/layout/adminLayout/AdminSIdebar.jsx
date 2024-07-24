import { AlignJustify, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { DASHBOARD_ADMIN_SIDEBAR_LINKS } from './Navigation';

// Variants pour les animations de la sidebar
const sidebarVariants = {
  open: { width: '240px', transition: { type: 'spring', stiffness: 300, damping: 25 } },
  closed: { width: '60px', transition: { type: 'spring', stiffness: 300, damping: 25 } }
};

// Variants pour les animations des liens
const linkVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  },
  closed: {
    opacity: 0,
    x: -20,
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  }
};

const AdminSidebar = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // État pour gérer l'ouverture/fermeture de la sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <motion.aside
      className="bg-gray-800 p-3 text-primaryColor h-full absolute top-0 left-0 z-50"
      variants={sidebarVariants}
      animate={isSidebarOpen ? 'open' : 'closed'}
    >
      <div className="flex items-center justify-between">
        {/* Icone pour basculer la sidebar */}
        <button onClick={toggleSidebar} className="text-secondaryColor focus:outline-none">
          {isSidebarOpen ? (
            <X className="text-red-600" size="25" />
          ) : (
            <AlignJustify className='text-gray-700' size="25" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isSidebarOpen ? (
          <motion.div
            className="flex-1 mt-2"
            variants={linkVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {DASHBOARD_ADMIN_SIDEBAR_LINKS.map((link) => (
              <motion.div
                key={link.key}
                variants={linkVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <Link
                  to={link.href}
                  className={`flex items-center gap-2 mb-[2px] px-1 py-1 rounded-lg text-[9px] ${
                    location.pathname === link.href
                      ? 'bg-secondaryColor text-gray-800 font-bold'
                      : 'text-primaryColor font-bold'
                  } hover:bg-secondaryColor hover:text-backgroundColor`}
                >
                  <span className='icon-size-adjusted'>
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="mt-2"
            variants={linkVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {DASHBOARD_ADMIN_SIDEBAR_LINKS.map((link) => (
              <motion.div
                key={link.key}
                variants={linkVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <Link
                  to={link.href}
                  className={`flex items-center text-center gap-2 mb-[2px] px-1 py-1 rounded-lg text-[10px] ${
                    location.pathname === link.href
                      ? 'bg-secondaryColor text-gray-800'
                      : 'text-primaryColor font-bold'
                  } hover:bg-secondaryColor hover:text-backgroundColor`}
                >
                  <span className='icon-size-adjusted'>
                    {link.icon}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
};

export default AdminSidebar;
