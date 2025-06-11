'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from '@/navigation';

type VerificationState = 'loading' | 'success' | 'error' | 'invalid-token';

const VerifyEmailPage: React.FC = () => {
  const [state, setState] = useState<VerificationState>('loading');
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(5);

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

    const handleEmailVerification = async () => {
      try {
        const response = await verifyEmail(token);

        if (response.success) {
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
          setState('error');
          setMessage(
            response.error || 'Email verification failed. Please try again.'
          );
        }
      } catch (error) {
        console.error('Email verification error:', error);
        setState('error');
        setMessage('An unexpected error occurred. Please try again.');
      }
    };

    handleEmailVerification();
  }, [searchParams, verifyEmail, router]);

  const renderContent = () => {
    switch (state) {
      case 'loading':
        return (
          <div className="verification-container">
            <div className="verification-card">
              <div className="spinner"></div>
              <h1>Verifying Your Email</h1>
              <p>Please wait while we verify your email address...</p>
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="verification-container">
            <div className="verification-card success">
              <div className="success-icon">✓</div>
              <h1>Email Verified Successfully!</h1>
              <p>{message}</p>
              <p>
                You will be redirected to the dashboard in {countdown} seconds.
              </p>
              <Link href="/en" className="continue-button">
                Continue to Dashboard
              </Link>
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

  return (
    <>
      {renderContent()}
      <style jsx>{`
        .verification-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .verification-card {
          background: white;
          border-radius: 12px;
          padding: 40px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          width: 100%;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .success-icon,
        .error-icon {
          font-size: 60px;
          margin-bottom: 20px;
        }

        .success-icon {
          color: #10b981;
        }

        .error-icon {
          color: #ef4444;
        }

        h1 {
          color: #1f2937;
          margin-bottom: 16px;
          font-size: 24px;
          font-weight: 600;
        }

        p {
          color: #6b7280;
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 24px;
        }

        .continue-button,
        .resend-button,
        .login-button,
        .register-button {
          display: inline-block;
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s;
        }

        .continue-button {
          background: #667eea;
          color: white;
        }

        .continue-button:hover {
          background: #5a67d8;
          transform: translateY(-1px);
        }

        .resend-button {
          background: #10b981;
          color: white;
        }

        .resend-button:hover {
          background: #059669;
        }

        .login-button,
        .register-button {
          background: #f3f4f6;
          color: #374151;
          border: 1px solid #d1d5db;
        }

        .login-button:hover,
        .register-button:hover {
          background: #e5e7eb;
        }

        @media (max-width: 640px) {
          .verification-card {
            padding: 30px 20px;
          }

          .actions {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
};

export default VerifyEmailPage;
