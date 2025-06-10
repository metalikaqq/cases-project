/**
 * Utility functions for email verification
 */

export interface VerificationResult {
  success: boolean;
  data?: any;
  error?: string;
  shouldRetry?: boolean;
}

/**
 * Check if verification error suggests the user is already verified
 */
export const isAlreadyVerifiedError = (error: string): boolean => {
  const alreadyVerifiedMessages = [
    'token has already been used',
    'already verified',
    'email is already verified',
    'user is already verified',
  ];

  return alreadyVerifiedMessages.some((msg) =>
    error.toLowerCase().includes(msg.toLowerCase())
  );
};

/**
 * Check if verification error suggests token is expired
 */
export const isTokenExpiredError = (error: string): boolean => {
  const expiredMessages = [
    'token has expired',
    'verification link has expired',
    'token is no longer valid',
  ];

  return expiredMessages.some((msg) =>
    error.toLowerCase().includes(msg.toLowerCase())
  );
};

/**
 * Get user-friendly error message for verification failures
 */
export const getVerificationErrorMessage = (error: string): string => {
  if (isAlreadyVerifiedError(error)) {
    return 'Your email is already verified. You can proceed to login.';
  }

  if (isTokenExpiredError(error)) {
    return 'This verification link has expired. Please request a new verification email.';
  }

  // Default error message
  return error || 'Email verification failed. Please try again.';
};

/**
 * Handle verification failure and determine next action
 */
export const handleVerificationFailure = (
  error: string
): {
  message: string;
  showResendButton: boolean;
  showLoginButton: boolean;
} => {
  if (isAlreadyVerifiedError(error)) {
    return {
      message:
        'Your email is already verified. You can now login to your account.',
      showResendButton: false,
      showLoginButton: true,
    };
  }

  if (isTokenExpiredError(error)) {
    return {
      message:
        'This verification link has expired. Please request a new verification email.',
      showResendButton: true,
      showLoginButton: false,
    };
  }

  return {
    message: getVerificationErrorMessage(error),
    showResendButton: true,
    showLoginButton: true,
  };
};

/**
 * Create a delay for retry attempts
 */
export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Retry verification with exponential backoff
 */
export const retryVerification = async (
  verificationFn: () => Promise<VerificationResult>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<VerificationResult> => {
  let lastError: string = '';

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const result = await verificationFn();

      if (result.success) {
        return result;
      }

      lastError = result.error || 'Unknown error';

      // Don't retry if it's a permanent error
      if (isAlreadyVerifiedError(lastError) || isTokenExpiredError(lastError)) {
        return result;
      }

      // Wait before retrying (exponential backoff)
      if (attempt < maxRetries - 1) {
        await delay(baseDelay * Math.pow(2, attempt));
      }
    } catch (error) {
      lastError = error instanceof Error ? error.message : 'Network error';

      if (attempt < maxRetries - 1) {
        await delay(baseDelay * Math.pow(2, attempt));
      }
    }
  }

  return {
    success: false,
    error: lastError,
  };
};
