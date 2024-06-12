"use client";

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
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
};

export default function EmailCustomInput({ type, text, value, onChange, error }: EmailCustomInputProps) {
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      return `${match[1]} ${match[2]} ${match[3]}`.trim();
    }
    return value;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    if (type === InputType.PhoneNumber) {
      newValue = newValue.replace(/\D/g, ''); // Remove non-numeric characters
      newValue = newValue.slice(0, 10); // Limit to 10 characters
      newValue = formatPhoneNumber(newValue);
    }
    onChange({ ...e, target: { ...e.target, value: newValue } } as React.ChangeEvent<HTMLInputElement>);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    let pasteData = e.clipboardData.getData('Text').replace(/\D/g, '');
    pasteData = pasteData.slice(0, 10); // Limit to 10 characters
    const formattedValue = formatPhoneNumber(pasteData);
    const fakeEvent = {
      ...e,
      target: {
        ...e.target,
        value: formattedValue
      }
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    onChange(fakeEvent);
    e.preventDefault();
  };

  return (
    <div className={s.container}>
      <input
        className={`${s.input} ${error ? s.inputError : ""}`}
        type={type}
        value={value}
        onChange={handleChange}
        onPaste={handlePaste}
        placeholder={type === InputType.PhoneNumber ? "000 000 0000" : ""}
      />
      <label className={s.label}>{text}</label>
      {error && <span className={s.error}>{error}</span>}
    </div>
  );
}
