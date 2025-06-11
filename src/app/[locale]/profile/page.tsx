'use client';
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  changePasswordSchema,
  ChangePasswordFormData,
} from '@/utils/validationSchemas';
import { ProtectedRoute } from '@/components/Auth/ProtectedRoute';
import s from '../login/page.module.scss';

const ProfilePage = () => {
  const { user, logout, changePassword } = useAuth();
  const router = useRouter();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const [changePasswordSuccess, setChangePasswordSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const onChangePassword = async (data: ChangePasswordFormData) => {
    setIsChangingPassword(true);
    setChangePasswordSuccess(false);

    try {
      const response = await changePassword(data);

      if (response.success) {
        setChangePasswordSuccess(true);
        reset();
      }
    } catch (error) {
      console.error('Password change error:', error);
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className={s.loginContainer}>
        <div className={s.formWrapper}>
          <h1 className={s.title}>PROFILE</h1>

          {/* User Information */}
          <div className={`${s.form} ${s.userInfo}`}>
            <div className={s.inputContainer}>
              <label className={s.label}>EMAIL</label>
              <div className={s.userInfoValue}>{user?.email}</div>
            </div>
            <div className={s.inputContainer}>
              <label className={s.label}>STATUS</label>
              <div className={s.userInfoValue}>
                {user?.isEmailVerified ? (
                  <span className={s.verified}>✓ Verified</span>
                ) : (
                  <span className={s.unverified}>⚠ Email not verified</span>
                )}
              </div>
            </div>
            <div className={s.inputContainer}>
              <label className={s.label}>ROLE</label>
              <div className={s.userInfoValue}>{user?.role}</div>
            </div>
          </div>

          {/* Change Password Form */}
          <form className={s.form} onSubmit={handleSubmit(onChangePassword)}>
            <h2 className={s.subtitle}>CHANGE PASSWORD</h2>

            <div className={s.inputContainer}>
              <label htmlFor="currentPassword" className={s.label}>
                CURRENT PASSWORD
              </label>
              <input
                {...register('currentPassword')}
                type={showPasswords ? 'text' : 'password'}
                id="currentPassword"
                className={s.input}
                placeholder="••••••••"
              />
              {errors.currentPassword && (
                <span className={s.errorText}>
                  {errors.currentPassword.message}
                </span>
              )}
            </div>

            <div className={s.inputContainer}>
              <label htmlFor="newPassword" className={s.label}>
                NEW PASSWORD
              </label>
              <input
                {...register('newPassword')}
                type={showPasswords ? 'text' : 'password'}
                id="newPassword"
                className={s.input}
                placeholder="••••••••"
              />
              {errors.newPassword && (
                <span className={s.errorText}>
                  {errors.newPassword.message}
                </span>
              )}
            </div>

            <div className={s.inputContainer}>
              <label htmlFor="confirmNewPassword" className={s.label}>
                CONFIRM NEW PASSWORD
              </label>
              <input
                {...register('confirmNewPassword')}
                type={showPasswords ? 'text' : 'password'}
                id="confirmNewPassword"
                className={s.input}
                placeholder="••••••••"
              />
              {errors.confirmNewPassword && (
                <span className={s.errorText}>
                  {errors.confirmNewPassword.message}
                </span>
              )}
            </div>

            <div className={s.flexContainer}>
              <div className={s.flexStart}>
                <input
                  id="showPasswords"
                  type="checkbox"
                  className={s.checkbox}
                  checked={showPasswords}
                  onChange={() => setShowPasswords(!showPasswords)}
                />
                <label htmlFor="showPasswords" className={s.rememberMe}>
                  Show Passwords
                </label>
              </div>
            </div>

            {changePasswordSuccess && (
              <div className={s.successMessage}>
                Password changed successfully!
              </div>
            )}

            <button
              type="submit"
              disabled={isChangingPassword}
              className={s.submitButton}
              style={{ marginBottom: '1rem' }}
            >
              {isChangingPassword ? 'Changing password...' : 'CHANGE PASSWORD'}
            </button>
          </form>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className={`${s.submitButton} ${s.logoutButton}`}
          >
            LOGOUT
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ProfilePage;
