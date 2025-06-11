'use client';
import React, { useState } from 'react';
import s from '../login/page.module.scss';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Link } from '@/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormData } from '@/utils/validationSchemas';

const RegisterForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);

    try {
      const response = await registerUser(data);

      if (response.success) {
        // Redirect to email verification pending page
        router.push('/en/verify-email-pending');
      } else {
        // Form errors are handled by react-hook-form
        console.error('Registration failed:', response.error);
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={s.loginContainer}>
      <div className={s.formWrapper}>
        <h1 className={s.title}>CREATE ACCOUNT</h1>

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
            <div className={s.inputContainer}>
              <label htmlFor="confirmPassword" className={s.label}>
                CONFIRM PASSWORD
              </label>
              <input
                {...register('confirmPassword')}
                type={showPass ? 'text' : 'password'}
                id="confirmPassword"
                placeholder="••••••••"
                className={s.input}
              />
              {errors.confirmPassword && (
                <span className={s.errorText}>
                  {errors.confirmPassword.message}
                </span>
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
          </div>

          <button type="submit" disabled={isLoading} className={s.submitButton}>
            {isLoading ? 'Creating account...' : 'SIGN UP'}
          </button>

          <p className={s.registerText}>
            Have an account?{' '}
            <Link href="/login" className={s.signUpLink}>
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
