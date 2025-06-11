'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from '@/navigation';
import {
  handleVerificationFailure,
  isAlreadyVerifiedError,
} from '@/utils/verificationUtils';
import './VerifyEmail.scss';

type VerificationState =
  | 'loading'
  | 'success'
  | 'error'
  | 'invalid-token'
  | 'already-verified';

const VerifyEmailPage: React.FC = () => {
  const [state, setState] = useState<VerificationState>('loading');
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(10); // Збільшено до 10 секунд
  const [isVerifying, setIsVerifying] = useState(false); // Додаємо флаг для запобігання подвійних запитів

  const searchParams = useSearchParams();
  const router = useRouter();
  const { verifyEmail } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setState('invalid-token');
      setMessage(
        'Invalid verification link. Please check your email and try again.'
      );
      return;
    }

    // Запобігаємо подвійним запитам
    if (isVerifying) {
      console.log('🚫 Verification already in progress, skipping...');
      return;
    }

    const handleEmailVerification = async () => {
      if (isVerifying) return; // Додаткова перевірка

      setIsVerifying(true);
      try {
        console.log('🔄 Starting email verification with token:', token);
        const response = await verifyEmail(token);
        console.log('📧 Verification response:', response);

        if (response.success) {
          console.log('✅ Verification successful!');
          setState('success');
          setMessage(
            response.data?.message ||
              'Email verified successfully! You are now logged in.'
          );

          // Start countdown for redirect
          const interval = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(interval);
                router.push('/en');
                return 0;
              }
              return prev - 1;
            });
          }, 1000);

          return () => clearInterval(interval);
        } else {
          console.log('❌ Verification failed:', response.error);

          // Використовуємо утиліту для обробки помилок
          const errorDetails = handleVerificationFailure(response.error || '');

          if (isAlreadyVerifiedError(response.error || '')) {
            setState('already-verified');
          } else {
            setState('error');
          }

          setMessage(errorDetails.message);
        }
      } catch (error) {
        console.error('💥 Email verification error:', error);
        setState('error');
        setMessage('An unexpected error occurred. Please try again.');
      } finally {
        setIsVerifying(false);
      }
    };

    handleEmailVerification();
  }, [searchParams, verifyEmail, router, isVerifying]); // Додаємо isVerifying до залежностей

  const renderContent = () => {
    switch (state) {
      case 'loading':
        return (
          <div className="verification-container">
            <div className="verification-card">
              <div className="loading-animation">
                <div className="spinner"></div>
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <h1>🔐 Verifying Your Email</h1>
              <p>Please wait while we verify your email address...</p>
              <div className="loading-progress">
                <div className="progress-bar"></div>
              </div>
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="verification-container">
            <div className="verification-card success">
              <div className="confetti"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>

              <div className="success-animation">
                <div className="checkmark-circle">
                  <div className="checkmark"></div>
                </div>
              </div>

              <h1>🎉 Email Verified Successfully!</h1>
              <p className="success-message">{message}</p>

              <div className="countdown-container">
                <div className="countdown-circle">
                  <svg className="countdown-svg" width="80" height="80">
                    <circle
                      cx="40"
                      cy="40"
                      r="35"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="6"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="35"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="6"
                      strokeLinecap="round"
                      className="countdown-progress"
                      style={{
                        strokeDasharray: '220',
                        strokeDashoffset: `${220 - (220 * (10 - countdown)) / 10}`,
                        transform: 'rotate(-90deg)',
                        transformOrigin: '40px 40px',
                        transition: 'stroke-dashoffset 1s linear',
                      }}
                    />
                  </svg>
                  <div className="countdown-number">{countdown}</div>
                </div>
                <p className="countdown-text">Redirecting to dashboard...</p>
              </div>

              <div className="action-buttons">
                <Link href="/en" className="primary-button">
                  <span className="button-icon">🚀</span>
                  Continue to Dashboard
                </Link>
                <button
                  onClick={() => router.push('/en')}
                  className="secondary-button"
                >
                  Skip Wait
                </button>
              </div>
            </div>
          </div>
        );

      case 'error':
        return (
          <div className="verification-container">
            <div className="verification-card error">
              <div className="error-icon">✗</div>
              <h1>Verification Failed</h1>
              <p>{message}</p>
              <div className="actions">
                <Link href="/en/verify-email-pending" className="resend-button">
                  Resend Verification Email
                </Link>
                <Link href="/en/login" className="login-button">
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        );

      case 'already-verified':
        return (
          <div className="verification-container">
            <div className="verification-card success">
              <div className="success-icon">✓</div>
              <h1>Already Verified!</h1>
              <p>{message}</p>
              <div className="actions">
                <Link href="/login" className="continue-button">
                  Continue to Login
                </Link>
                <Link href="/" className="login-button">
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        );

      case 'invalid-token':
        return (
          <div className="verification-container">
            <div className="verification-card error">
              <div className="error-icon">⚠</div>
              <h1>Invalid Verification Link</h1>
              <p>{message}</p>
              <div className="actions">
                <Link href="/en/verify-email-pending" className="resend-button">
                  Request New Verification Email
                </Link>
                <Link href="/en/register" className="register-button">
                  Create New Account
                </Link>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return <>{renderContent()}</>;
};

export default VerifyEmailPage;
