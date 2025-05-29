/**
 * Reusable error display component for product-related errors
 */

import React from 'react';
import { ProductError } from '@/types/product';
import styles from './ErrorDisplay.module.scss';

interface ErrorDisplayProps {
  error: ProductError | Error | string;
  onRetry?: () => void;
  className?: string;
}

export type { ErrorDisplayProps };

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onRetry,
  className
}) => {
  const getErrorMessage = (): string => {
    if (typeof error === 'string') return error;
    if (error instanceof Error) return error.message;
    return error.message || 'An unexpected error occurred';
  };

  const getErrorCode = (): string | null => {
    if (typeof error === 'object' && 'code' in error) {
      return error.code;
    }
    return null;
  };

  return (
    <div className={`${styles.errorContainer} ${className || ''}`}>
      <div className={styles.errorIcon}>⚠️</div>
      <div className={styles.errorContent}>
        <h3 className={styles.errorTitle}>Something went wrong</h3>
        <p className={styles.errorMessage}>{getErrorMessage()}</p>
        {getErrorCode() && (
          <p className={styles.errorCode}>Error Code: {getErrorCode()}</p>
        )}
        {onRetry && (
          <button
            className={styles.retryButton}
            onClick={onRetry}
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};
