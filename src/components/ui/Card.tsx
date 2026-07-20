import React from 'react';
import { motion } from 'framer-motion';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  animated?: boolean;
  delay?: number;
}

export const Card: React.FC<CardProps> = ({
  children,
  glass = false,
  hoverable = false,
  padding = 'md',
  animated = false,
  delay = 0,
  className = '',
  ...props
}) => {
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-8',
  };

  const baseClass = glass
    ? 'glass-card rounded-ch'
    : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-ch shadow-soft';

  const combinedClass = `${baseClass} ${paddings[padding]} ${className}`;

  const hoverProps = hoverable
    ? {
        whileHover: { y: -2, boxShadow: '0 12px 40px -4px rgba(15,23,42,0.12)' },
        transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as number[] },
      }
    : {};

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        {...hoverProps}
        className={combinedClass}
      >
        {children}
      </motion.div>
    );
  }

  if (hoverable) {
    return (
      <motion.div {...hoverProps} className={combinedClass}>
        {children}
      </motion.div>
    );
  }

  return (
    <div className={combinedClass} {...props}>
      {children}
    </div>
  );
};
