'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import s from '../login/page.module.scss';
import { signUp } from '@/api/routes/auth';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }

    const uniqueChars = new Set(password).size;
    if (uniqueChars < 3) {
      return 'Password must contain at least 3 different characters.';
    }

    return ''; // No error
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setError(''); // Clear errors if everything is valid

    try {
      await signUp({ email, password });
      setSuccess(true);
      console.log('Registration successful');
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className={s.loginContainer}>
      <div className={s.formWrapper}>
        <h1 className={s.title}>CREATE ACCOUNT</h1>

        <form className={s.form} onSubmit={handleSubmit}>
          <div>
            <div className={s.inputContainer}>
              <label htmlFor="email" className={s.label}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={s.input}
                placeholder="name@example.com"
                required
              />
            </div>
            <div className={s.inputContainer}>
              <label htmlFor="password" className={s.label}>
                Password
              </label>
              <input
                type={showPass ? 'text' : 'password'}
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={s.input}
                required
              />
            </div>
            <div className={s.inputContainer}>
              <label htmlFor="confirmPassword" className={s.label}>
                Confirm Password
              </label>
              <input
                type={showPass ? 'text' : 'password'}
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className={s.input}
                required
              />
            </div>
          </div>
          {error && <p className={s.errorMessage}>{error}</p>}{' '}
          {/* Display error message */}
          {success && (
            <p className={s.successMessage}>Registration successful!</p>
          )}{' '}
          {/* Display success message */}
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
          <button type="submit" className={s.submitButton}>
            Sign up
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
