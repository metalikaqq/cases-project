'use client';

import React, { useState } from 'react';
import s from './ContactForm.module.scss';
import EmailCustomInput from '@/UI/EmailCustomInput';
import { InputType } from '@/UI/EmailCustomInput/EmailCustomInput';
import { sendContactEmail, ContactFormData } from '@/utils/emailService';
import { isUkrainianLocale } from '@/utils/productUtils';

interface ContactFormProps {
  locale: string;
  productName?: string;
  onClose?: () => void;
}

export default function ContactForm({
  locale,
  productName,
  onClose,
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
    selectedValue: productName || 'Product Inquiry',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const isUkrainian = isUkrainianLocale(locale);

  const texts = {
    title: isUkrainian ? "Зв'язатися з нами" : 'Contact Us',
    firstName: isUkrainian ? "Ім'я" : 'First Name',
    lastName: isUkrainian ? 'Прізвище' : 'Last Name',
    email: isUkrainian ? 'Електронна пошта' : 'Email',
    phoneNumber: isUkrainian ? 'Номер телефону' : 'Phone Number',
    message: isUkrainian ? 'Повідомлення' : 'Message',
    messagePlaceholder: isUkrainian
      ? 'Введіть ваше повідомлення тут...'
      : 'Enter your message here...',
    submit: isUkrainian ? 'Відправити' : 'Send Message',
    submitting: isUkrainian ? 'Відправляємо...' : 'Sending...',
    successMessage: isUkrainian
      ? "Повідомлення успішно відправлено! Ми зв'яжемося з вами найближчим часом."
      : 'Message sent successfully! We will get back to you soon.',
    errorGeneral: isUkrainian
      ? 'Помилка відправки повідомлення. Спробуйте ще раз.'
      : 'Error sending message. Please try again.',
    requiredFields: isUkrainian
      ? "Заповніть всі обов'язкові поля"
      : 'Please fill in all required fields',
    validEmail: isUkrainian
      ? 'Введіть коректну електронну адресу'
      : 'Please enter a valid email address',
    validPhone: isUkrainian
      ? 'Введіть коректний номер телефону'
      : 'Please enter a valid phone number',
    messageMinLength: isUkrainian
      ? 'Повідомлення має містити мінімум 10 символів'
      : 'Message must be at least 10 characters long',
  };

  const handleInputChange =
    (field: keyof ContactFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Clear error when user starts typing
      if (errors[field as keyof typeof errors]) {
        setErrors((prev) => ({
          ...prev,
          [field]: '',
        }));
      }
    };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      message: value,
    }));

    if (errors.message) {
      setErrors((prev) => ({
        ...prev,
        message: '',
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      message: '',
    };

    let isValid = true;

    // Validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = texts.requiredFields;
      isValid = false;
    }

    // Validate last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = texts.requiredFields;
      isValid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = texts.requiredFields;
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = texts.validEmail;
      isValid = false;
    }

    // Validate phone number
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = texts.requiredFields;
      isValid = false;
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = texts.validPhone;
      isValid = false;
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = texts.requiredFields;
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = texts.messageMinLength;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      console.log('Відправляємо email:', formData);

      const result = await sendContactEmail(formData);

      console.log('Результат:', result);

      if (result.success) {
        setSubmitStatus('success');
        // Clear form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          message: '',
          selectedValue: productName || 'Product Inquiry',
        });

        // Auto close modal after 3 seconds
        setTimeout(() => {
          if (onClose) {
            onClose();
          }
        }, 3000);
      } else {
        throw new Error(result.error || result.message || 'Unknown error');
      }
    } catch (error: any) {
      console.error('Помилка відправки:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message || texts.errorGeneral);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={s.contactForm}>
      <h2 className={s.title}>{texts.title}</h2>

      <form onSubmit={handleSubmit} className={s.form}>
        <div className={s.row}>
          <div className={s.inputGroup}>
            <EmailCustomInput
              type={InputType.Text}
              text={texts.firstName}
              value={formData.firstName}
              onChange={handleInputChange('firstName')}
              error={errors.firstName}
              disabled={isSubmitting}
            />
          </div>
          <div className={s.inputGroup}>
            <EmailCustomInput
              type={InputType.Text}
              text={texts.lastName}
              value={formData.lastName}
              onChange={handleInputChange('lastName')}
              error={errors.lastName}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className={s.inputGroup}>
          <EmailCustomInput
            type={InputType.Email}
            text={texts.email}
            value={formData.email}
            onChange={handleInputChange('email')}
            error={errors.email}
            disabled={isSubmitting}
          />
        </div>

        <div className={s.inputGroup}>
          <EmailCustomInput
            type={InputType.PhoneNumber}
            text={texts.phoneNumber}
            value={formData.phoneNumber}
            onChange={handleInputChange('phoneNumber')}
            error={errors.phoneNumber}
            disabled={isSubmitting}
          />
        </div>

        <div className={s.inputGroup}>
          <label className={s.label}>{texts.message}</label>
          <textarea
            className={`${s.textarea} ${errors.message ? s.textareaError : ''}`}
            placeholder={texts.messagePlaceholder}
            value={formData.message}
            onChange={handleTextAreaChange}
            disabled={isSubmitting}
            rows={4}
          />
          {errors.message && <span className={s.error}>{errors.message}</span>}
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className={`${s.statusMessage} ${s.successMessage}`}>
            ✅ {texts.successMessage}
          </div>
        )}

        {submitStatus === 'error' && (
          <div className={`${s.statusMessage} ${s.errorMessage}`}>
            ❌ {errorMessage}
          </div>
        )}

        <button
          type="submit"
          className={`${s.submitButton} ${isSubmitting ? s.submitting : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? texts.submitting : texts.submit}
        </button>
      </form>
    </div>
  );
}
