'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import s from './page.module.scss';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

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

  const handleSubmit = (e: { preventDefault: () => void }) => {
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
    console.log(email, password);
  };

  return (
    <div className={s.loginContainer}>
      <Link href="/" className={s.closeButton}>
        <svg
          className={s.icon}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </Link>
      <div className={s.formWrapper}>
        <h1 className={s.title}>Create your account</h1>

        <form className={s.form} onSubmit={handleSubmit}>
          <div>
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
          <div>
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
          <div>
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
          {error && <p className={s.errorMessage}>{error}</p>}{' '}
          {/* Display error message */}
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
            <Link href="/auth/login" className={s.signUpLink}>
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
