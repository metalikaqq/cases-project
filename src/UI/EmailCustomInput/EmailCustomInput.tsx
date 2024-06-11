"use client"

import React, { useState } from "react";
import s from './EmailCustomInput.module.scss';

export enum InputType {
  Text = 'text',
  PhoneNumber = "tel",
  Email = "email",
}

export type EmailCustomInputProps = {
  type: InputType;
  text: string;
};

export default function EmailCustomInput({ type, text }: EmailCustomInputProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const validateInput = () => {
    let errorMessage = "";
    if (!value) {
      errorMessage = "This field cannot be blank.";
    } else if (type === InputType.Email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMessage = "Please enter a valid email address.";
      }
    } else if (type === InputType.PhoneNumber) {
      const phoneRegex = /^\d{3} \d{3} \d{4}$/;
      if (!phoneRegex.test(value)) {
        errorMessage = "Please enter a valid phone number.";
      }
    }

    setError(errorMessage);
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      return `${match[1]} ${match[2]} ${match[3]}`.trim();
    }
    return value;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    newValue = newValue.slice(0, 10); // Limit to 10 characters
    newValue = formatPhoneNumber(newValue);
    setValue(newValue);
  };

  const handleBlur = () => {
    validateInput();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    let pasteData = e.clipboardData.getData('Text').replace(/\D/g, '');
    pasteData = pasteData.slice(0, 10); // Limit to 10 characters
    const formattedValue = formatPhoneNumber(pasteData);
    setValue(formattedValue);
    e.preventDefault();
  };

  return (
    <div className={s.container}>
      <input
        className={`${s.input} ${error ? s.inputError : ""}`}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onPaste={handlePaste}
        placeholder={type === InputType.PhoneNumber ? "000 000 0000" : ""}
      />
      <label className={s.label}>{text}</label>
      {error && <span className={s.error}>{error}</span>}
    </div>
  );
}
