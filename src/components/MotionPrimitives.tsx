import React from 'react';
import { motion, Variants } from 'framer-motion';

export const VIEWPORT_CONFIG = {
  once: true,
  amount: 'some' as const,
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.04,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] },
  },
};

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const RevealSection: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={VIEWPORT_CONFIG}
    transition={{ duration: 0.42, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerGrid: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <motion.div
    variants={staggerContainerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={VIEWPORT_CONFIG}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <motion.div variants={staggerItemVariants} className={className}>
    {children}
  </motion.div>
);
