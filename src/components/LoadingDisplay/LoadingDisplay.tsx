/**
 * Reusable loading display component for product-related loading states
 */

import React from 'react';
import styles from './LoadingDisplay.module.scss';

interface LoadingDisplayProps {
  message?: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export type { LoadingDisplayProps };

export const LoadingDisplay: React.FC<LoadingDisplayProps> = ({
  message = 'Loading...',
  className = '',
  size = 'medium',
}) => {
  return (
    <div className={`${styles.loadingContainer} ${styles[size]} ${className}`}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingMessage}>{message}</p>
    </div>
  );
};
