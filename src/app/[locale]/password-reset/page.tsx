'use client';
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from '@/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  passwordResetRequestSchema,
  PasswordResetRequestFormData,
} from '@/utils/validationSchemas';

const PasswordResetPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const { requestPasswordReset } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetRequestFormData>({
    resolver: zodResolver(passwordResetRequestSchema),
  });

  const onSubmit = async (data: PasswordResetRequestFormData) => {
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await requestPasswordReset(data.email);

      if (response.success) {
        setSuccess(true);
      } else {
        setError(
          response.error ||
            'Failed to send password reset email. Please try again.'
        );
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <>
        <div className="reset-container">
          <div className="reset-card">
            <div className="success-icon">✓</div>
            <h1>Check Your Email</h1>
            <p>
              We&apos;ve sent a password reset link to your email address.
              Please check your inbox and follow the instructions to reset your
              password.
            </p>
            <div className="tips">
              <p>
                <strong>Don&apos;t see the email?</strong>
              </p>
              <ul>
                <li>Check your spam or junk mail folder</li>
                <li>Make sure you entered the correct email address</li>
                <li>The email may take a few minutes to arrive</li>
              </ul>
            </div>
            <Link href="/login" className="back-button">
              Back to Login
            </Link>
          </div>
        </div>
        <style jsx>{`
          .reset-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }

          .reset-card {
            background: white;
            border-radius: 12px;
            padding: 40px;
            max-width: 500px;
            width: 100%;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            text-align: center;
          }

          .success-icon {
            font-size: 60px;
            color: #10b981;
            margin-bottom: 20px;
          }

          h1 {
            color: #1f2937;
            margin-bottom: 16px;
            font-size: 28px;
            font-weight: 600;
          }

          p {
            color: #6b7280;
            line-height: 1.6;
            margin-bottom: 24px;
          }

          .tips {
            background: #f9fafb;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
            text-align: left;
          }

          .tips ul {
            margin: 12px 0 0;
            padding-left: 20px;
          }

          .tips li {
            margin-bottom: 8px;
            color: #6b7280;
          }

          .back-button {
            display: inline-block;
            background: #667eea;
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 500;
            transition: background-color 0.2s;
          }

          .back-button:hover {
            background: #5a67d8;
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <div className="reset-container">
        <div className="reset-card">
          <h1>Reset Password</h1>
          <p>
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="reset-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                {...register('email')}
                type="email"
                id="email"
                placeholder="Enter your email address"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && (
                <span className="error-text">{errors.email.message}</span>
              )}
            </div>

            {error && <div className="error-message">{error}</div>}

            <button
              type="submit"
              disabled={isLoading}
              className="submit-button"
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>

            <Link href="/login" className="back-link">
              Back to Login
            </Link>
          </form>
        </div>
      </div>

      <style jsx>{`
        .reset-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .reset-card {
          background: white;
          border-radius: 12px;
          padding: 40px;
          max-width: 450px;
          width: 100%;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        h1 {
          color: #1f2937;
          margin-bottom: 8px;
          font-size: 28px;
          font-weight: 600;
          text-align: center;
        }

        p {
          color: #6b7280;
          margin-bottom: 32px;
          text-align: center;
          line-height: 1.6;
        }

        .reset-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        label {
          font-weight: 500;
          color: #374151;
          font-size: 14px;
        }

        input {
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.2s;
        }

        input:focus {
          outline: none;
          border-color: #667eea;
        }

        input.error {
          border-color: #ef4444;
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
          text-align: center;
        }

        .submit-button {
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

        .submit-button:hover:not(:disabled) {
          background: #5a67d8;
        }

        .submit-button:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }

        .back-link {
          text-align: center;
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
        }

        .back-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 640px) {
          .reset-card {
            padding: 30px 20px;
          }
        }
      `}</style>
    </>
  );
};

export default PasswordResetPage;
