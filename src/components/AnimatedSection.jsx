import React from 'react';
import { motion } from 'framer-motion';

const AnimatedSection = ({ children, className = '', delay = 0, yOffset = 50, duration = 0.6 }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: duration, delay: delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
