'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from '@/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordResetConfirmSchema, PasswordResetConfirmFormData } from '@/utils/validationSchemas';

const PasswordResetConfirmPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const { confirmPasswordReset } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetConfirmFormData>({
    resolver: zodResolver(passwordResetConfirmSchema),
  });

  useEffect(() => {
    const resetToken = searchParams.get('token');
    if (!resetToken) {
      setError('Invalid or missing reset token. Please request a new password reset.');
      return;
    }
    setToken(resetToken);
  }, [searchParams]);

  const onSubmit = async (data: PasswordResetConfirmFormData) => {
    if (!token) {
      setError('Invalid reset token. Please request a new password reset.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await confirmPasswordReset({
        token,
        newPassword: data.newPassword,
      });

      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        setError(response.error || 'Failed to reset password. Please try again.');
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
        <div className="reset-confirm-container">
          <div className="reset-confirm-card">
            <div className="success-icon">✓</div>
            <h1>Password Reset Successfully!</h1>
            <p>
              Your password has been reset successfully. You can now log in with your new password.
            </p>
            <p>You will be redirected to the login page in a few seconds...</p>
            <Link href="/login" className="login-button">
              Go to Login
            </Link>
          </div>
        </div>
        <style jsx>{`
          .reset-confirm-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }

          .reset-confirm-card {
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
            margin-bottom: 16px;
          }

          .login-button {
            display: inline-block;
            background: #667eea;
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 500;
            transition: background-color 0.2s;
            margin-top: 16px;
          }

          .login-button:hover {
            background: #5a67d8;
          }
        `}</style>
      </>
    );
  }

  if (!token) {
    return (
      <>
        <div className="reset-confirm-container">
          <div className="reset-confirm-card">
            <div className="error-icon">⚠</div>
            <h1>Invalid Reset Link</h1>
            <p>
              This password reset link is invalid or has expired. Please request a new password reset.
            </p>
            <div className="actions">
              <Link href="/password-reset" className="reset-button">
                Request New Reset
              </Link>
              <Link href="/login" className="login-button">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
        <style jsx>{`
          .reset-confirm-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }

          .reset-confirm-card {
            background: white;
            border-radius: 12px;
            padding: 40px;
            max-width: 500px;
            width: 100%;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            text-align: center;
          }

          .error-icon {
            font-size: 60px;
            color: #ef4444;
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

          .actions {
            display: flex;
            gap: 12px;
            justify-content: center;
          }

          .reset-button,
          .login-button {
            display: inline-block;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 500;
            transition: all 0.2s;
          }

          .reset-button {
            background: #10b981;
            color: white;
          }

          .reset-button:hover {
            background: #059669;
          }

          .login-button {
            background: #f3f4f6;
            color: #374151;
            border: 1px solid #d1d5db;
          }

          .login-button:hover {
            background: #e5e7eb;
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <div className="reset-confirm-container">
        <div className="reset-confirm-card">
          <h1>Set New Password</h1>
          <p>Enter your new password below.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="reset-form">
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <div className="password-input-container">
                <input
                  {...register('newPassword')}
                  type={showPassword ? 'text' : 'password'}
                  id="newPassword"
                  placeholder="Enter your new password"
                  className={errors.newPassword ? 'error' : ''}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.newPassword && (
                <span className="error-text">{errors.newPassword.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                {...register('confirmPassword')}
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                placeholder="Confirm your new password"
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && (
                <span className="error-text">{errors.confirmPassword.message}</span>
              )}
            </div>

            {error && (
              <div className="error-message">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="submit-button"
            >
              {isLoading ? 'Resetting Password...' : 'Reset Password'}
            </button>

            <Link href="/login" className="back-link">
              Back to Login
            </Link>
          </form>
        </div>
      </div>

      <style jsx>{`
        .reset-confirm-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .reset-confirm-card {
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

        .password-input-container {
          position: relative;
        }

        .password-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          font-size: 16px;
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
          .reset-confirm-card {
            padding: 30px 20px;
          }
        }
      `}</style>
    </>
  );
};

export default PasswordResetConfirmPage;
