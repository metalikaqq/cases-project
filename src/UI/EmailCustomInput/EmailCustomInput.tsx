'use client';

import React, { useState } from 'react';
import s from './EmailCustomInput.module.scss';

export enum InputType {
  Text = 'text',
  PhoneNumber = 'tel',
  Email = 'email',
}

export type EmailCustomInputProps = {
  type: InputType;
  text: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  disabled?: boolean;
};

const countryCodes = [
  { name: 'USA', code: '+1' },
  { name: 'UK', code: '+44' },
  { name: 'UA', code: '+380' },
  // Додайте інші країни за потреби
];

export default function EmailCustomInput({
  type,
  text,
  value,
  onChange,
  error,
  disabled = false,
}: EmailCustomInputProps) {
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[2].code); // Default to Ukraine

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{1,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      return `${match[1]} ${match[2]} ${match[3]}`.trim();
    }
    return value;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    if (type === InputType.PhoneNumber) {
      newValue = newValue.replace(/\D/g, ''); // Remove non-numeric characters
      newValue = newValue.slice(0, 10); // Limit to 10 characters (or adjust based on country code)
      newValue = formatPhoneNumber(newValue);
    } else if (type === InputType.Email) {
      // Remove line breaks and whitespace for email
      newValue = newValue.replace(/[\r\n\s]/g, '');
    } else {
      // For regular text, remove line breaks but keep spaces
      newValue = newValue.replace(/[\r\n]/g, '');
    }

    onChange({
      ...e,
      target: { ...e.target, value: newValue },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    let pasteData = e.clipboardData.getData('Text');

    if (type === InputType.PhoneNumber) {
      pasteData = pasteData.replace(/\D/g, ''); // Remove non-numeric characters
      pasteData = pasteData.slice(0, 10); // Limit to 10 characters
      pasteData = formatPhoneNumber(pasteData);
    } else if (type === InputType.Email) {
      // Remove line breaks and whitespace for email
      pasteData = pasteData.replace(/[\r\n\s]/g, '');
    } else {
      // For regular text, remove line breaks but keep spaces
      pasteData = pasteData.replace(/[\r\n]/g, '');
    }

    const fakeEvent = {
      ...e,
      target: {
        ...e.target,
        value: pasteData,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    onChange(fakeEvent);
    e.preventDefault();
  };

  return (
    <div className={s.container}>
      {type === InputType.PhoneNumber && (
        <div className={s.phoneInputContainer}>
          <select
            className={s.countryCodeSelect}
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            disabled={disabled}
          >
            {countryCodes.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name} ({country.code})
              </option>
            ))}
          </select>
          <input
            className={`${s.input} ${error ? s.inputError : ''}`}
            type={type}
            value={value}
            onChange={handleChange}
            onPaste={handlePaste}
            placeholder={'xxx xxx xxxx'}
            disabled={disabled}
          />
        </div>
      )}
      {type !== InputType.PhoneNumber && (
        <input
          className={`${s.input} ${error ? s.inputError : ''}`}
          type={type}
          value={value}
          onChange={handleChange}
          onPaste={handlePaste}
          placeholder={type === InputType.Email ? 'you@example.com' : ''}
          disabled={disabled}
        />
      )}
      <label className={s.label}>{text}</label>
      {error && <span className={s.error}>{error}</span>}
    </div>
  );
}
