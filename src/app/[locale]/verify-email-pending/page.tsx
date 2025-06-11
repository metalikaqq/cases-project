'use client';
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from '@/navigation';

const resendSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ResendFormData = z.infer<typeof resendSchema>;

const VerifyEmailPendingPage: React.FC = () => {
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendError, setResendError] = useState('');
  const [cooldown, setCooldown] = useState(0);

  const { resendVerification } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResendFormData>({
    resolver: zodResolver(resendSchema),
  });

  const onResendSubmit = async (data: ResendFormData) => {
    if (cooldown > 0) return;

    setIsResending(true);
    setResendError('');
    setResendSuccess(false);

    try {
      const response = await resendVerification(data.email);

      if (response.success) {
        setResendSuccess(true);

        // Start cooldown timer
        setCooldown(60);
        const interval = setInterval(() => {
          setCooldown((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setResendError(
          response.error ||
            'Failed to resend verification email. Please try again.'
        );
      }
    } catch (error) {
      setResendError('An unexpected error occurred. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      <div className="pending-container">
        <div className="pending-card">
          <div className="email-icon">📧</div>
          <h1>Check Your Email</h1>
          <p>
            We&apos;ve sent a verification link to your email address. Please
            check your inbox and click the link to verify your account and
            complete the registration process.
          </p>

          <div className="tips">
            <h3>Don&apos;t see the email?</h3>
            <ul>
              <li>Check your spam or junk mail folder</li>
              <li>Make sure you entered the correct email address</li>
              <li>The email may take a few minutes to arrive</li>
            </ul>
          </div>

          <div className="resend-section">
            <h3>Resend Verification Email</h3>
            <form
              onSubmit={handleSubmit(onResendSubmit)}
              className="resend-form"
            >
              <div className="input-group">
                <input
                  {...register('email')}
                  type="email"
                  placeholder="Enter your email address"
                  className="email-input"
                />
                {errors.email && (
                  <span className="error-text">{errors.email.message}</span>
                )}
              </div>

              {resendError && (
                <div className="error-message">{resendError}</div>
              )}

              {resendSuccess && (
                <div className="success-message">
                  Verification email has been resent! Please check your inbox.
                </div>
              )}

              <button
                type="submit"
                disabled={isResending || cooldown > 0}
                className="resend-button"
              >
                {isResending
                  ? 'Sending...'
                  : cooldown > 0
                    ? `Resend in ${cooldown}s`
                    : 'Resend Verification Email'}
              </button>
            </form>
          </div>

          <div className="actions">
            <Link href="/en/login" className="back-button">
              Back to Login
            </Link>
            <Link href="/en/register" className="register-button">
              Use Different Email
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pending-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .pending-card {
          background: white;
          border-radius: 12px;
          padding: 40px;
          max-width: 600px;
          width: 100%;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .email-icon {
          font-size: 60px;
          text-align: center;
          margin-bottom: 20px;
        }

        h1 {
          text-align: center;
          color: #1f2937;
          margin-bottom: 16px;
          font-size: 28px;
          font-weight: 600;
        }

        p {
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 30px;
          text-align: center;
        }

        .tips {
          background: #f9fafb;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 30px;
        }

        .tips h3 {
          color: #374151;
          margin-bottom: 12px;
          font-size: 16px;
          font-weight: 600;
        }

        .tips ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .tips li {
          color: #6b7280;
          margin-bottom: 8px;
          padding-left: 20px;
          position: relative;
        }

        .tips li:before {
          content: '•';
          color: #667eea;
          position: absolute;
          left: 0;
          font-weight: bold;
        }

        .resend-section {
          border-top: 1px solid #e5e7eb;
          padding-top: 30px;
          margin-bottom: 30px;
        }

        .resend-section h3 {
          color: #374151;
          margin-bottom: 16px;
          font-size: 18px;
          font-weight: 600;
        }

        .resend-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .email-input {
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.2s;
        }

        .email-input:focus {
          outline: none;
          border-color: #667eea;
        }

        .error-text {
          color: #ef4444;
          font-size: 14px;
        }

        .error-message {
          background: #fef2f2;
          color: #dc2626;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #fecaca;
        }

        .success-message {
          background: #f0fdf4;
          color: #166534;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #bbf7d0;
        }

        .resend-button {
          background: #667eea;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .resend-button:hover:not(:disabled) {
          background: #5a67d8;
        }

        .resend-button:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }

        .actions {
          display: flex;
          gap: 12px;
          justify-content: center;
          border-top: 1px solid #e5e7eb;
          padding-top: 30px;
        }

        .back-button,
        .register-button {
          padding: 10px 20px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s;
        }

        .back-button {
          background: #f3f4f6;
          color: #374151;
          border: 1px solid #d1d5db;
        }

        .back-button:hover {
          background: #e5e7eb;
        }

        .register-button {
          background: #10b981;
          color: white;
        }

        .register-button:hover {
          background: #059669;
        }

        @media (max-width: 640px) {
          .pending-card {
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

export default VerifyEmailPendingPage;
