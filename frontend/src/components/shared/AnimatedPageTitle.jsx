import { motion } from 'framer-motion';

const AnimatedPageTitle = ({ title}) => {
  const titleVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.9,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={titleVariants}
    >
      <h1 className="text-gray-700 text-xl flex items-center gap-3 font-bold mb-2">
        {title}
      </h1>
      
    </motion.div>
  );
};

export default AnimatedPageTitle;
