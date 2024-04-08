"use client";
import s from "./CustomInput.module.scss";
import { useState } from "react";

export type CustomInputProps = {
  // props go here
};

export default function CustomInput(props: CustomInputProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);

    // Validate the email
    if (!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      setError("Email can't be blank.");
    } else {
      setError("");
    }
  };

  return (
    <>
      {error && (
        <div className={s.error__message}>
          <span className={s.error__message__text}>{error}</span>
        </div>
      )}
      <div className={s.email__input__container}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          className={s.email__input}
        />
        <button className={s.subscribe__button}>Subscribe</button>
      </div>
    </>
  );
}
