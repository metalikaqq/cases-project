'use client';
import React, { useState } from 'react';
import s from './page.module.scss';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useRouter } from '@/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/utils/validationSchemas';

const LoginPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showResendButton, setShowResendButton] = useState(false);
  const [resendEmail, setResendEmail] = useState('');

  const router = useRouter();
  const { login, resendVerification } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setLoginError('');
    setShowResendButton(false);

    try {
      const response = await login(data);

      if (response.success) {
        // Login successful, redirect to home
        router.push('/');
      } else {
        // Check if error is related to email verification
        if (
          response.error?.includes('email not verified') ||
          response.error?.includes('verify your email')
        ) {
          setShowResendButton(true);
          setResendEmail(data.email);
        }
        setLoginError(response.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      await resendVerification(resendEmail);
      router.push('/en/verify-email-pending');
    } catch (error) {
      console.error('Resend verification error:', error);
    }
  };

  return (
    <div className={s.loginContainer}>
      <div className={s.formWrapper}>
        <h1 className={s.title}>SIGN IN</h1>

        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className={s.inputContainer}>
              <label htmlFor="email" className={s.label}>
                EMAIL ADDRESS
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                className={s.input}
                placeholder="name@example.com"
              />
              {errors.email && (
                <span className={s.errorText}>{errors.email.message}</span>
              )}
            </div>

            <div className={s.inputContainer}>
              <label htmlFor="password" className={s.label}>
                PASSWORD
              </label>
              <input
                {...register('password')}
                type={showPass ? 'text' : 'password'}
                id="password"
                placeholder="••••••••"
                className={s.input}
              />
              {errors.password && (
                <span className={s.errorText}>{errors.password.message}</span>
              )}
            </div>
          </div>

          <div className={s.flexContainer}>
            <div className={s.flexStart}>
              <input
                id="showPassword"
                type="checkbox"
                className={s.checkbox}
                checked={showPass}
                onChange={() => setShowPass(!showPass)}
              />
              <label htmlFor="showPassword" className={s.rememberMe}>
                Show Password
              </label>
            </div>
            <Link href="/password-reset" className={s.forgotPassword}>
              Forgot Password?
            </Link>
          </div>

          {loginError && (
            <div className={s.errorContainer}>
              <div className={s.errorMessage}>{loginError}</div>
              {showResendButton && (
                <button
                  type="button"
                  onClick={handleResendVerification}
                  className={s.resendButton}
                >
                  Resend verification email
                </button>
              )}
            </div>
          )}

          <button type="submit" disabled={isLoading} className={s.submitButton}>
            {isLoading ? 'Signing in...' : 'SIGN IN'}
          </button>

          <p className={s.registerText}>
            Don&apos;t have an account?{' '}
            <Link href="/register" className={s.signUpLink}>
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
