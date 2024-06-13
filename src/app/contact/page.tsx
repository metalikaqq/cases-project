"use client";

import React, { useState } from "react";
import EmailCustomInput from "@/UI/EmailCustomInput";
import s from "./page.module.scss";
import { InputType } from "@/UI/EmailCustomInput/EmailCustomInput";

export default function Page() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    message: "",
  });

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      message: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      message: "",
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!form.firstName) {
      newErrors.firstName = "First Name cannot be blank.";
      isValid = false;
    }
    if (!form.lastName) {
      newErrors.lastName = "Last Name cannot be blank.";
      isValid = false;
    }
    if (!form.phoneNumber) {
      newErrors.phoneNumber = "Phone Number cannot be blank.";
      isValid = false;
    }
    if (!form.email) {
      newErrors.email = "Email cannot be blank.";
      isValid = false;
    }
    if (!form.message) {
      newErrors.message = "Message cannot be blank.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // handle form submission
      console.log("Form submitted:", form);
    }
  };

  return (
    <div className={s.wrapper}>
      <form className={s.email_request} onSubmit={handleSubmit}>
        <h1 className={s.email_request__title}>Request a quote:</h1>

        <div className={s.contacts}>
          <div className={s.colum_wrapper}>
            <div className={s.title}>Name</div>
            <div className={s.colum}>
              <div className={s.input}>
                <EmailCustomInput
                  type={InputType.Text}
                  text="First Name"
                  value={form.firstName}
                  onChange={handleChange("firstName")}
                  error={errors.firstName}
                />
              </div>
              <div className={s.input}>
                <EmailCustomInput
                  type={InputType.Text}
                  text="Last Name"
                  value={form.lastName}
                  onChange={handleChange("lastName")}
                  error={errors.lastName}
                />
              </div>
            </div>
          </div>

          <div className={s.colum_wrapper}>
            <div className={s.title}>Phone Number</div>
            <div className={s.input}>
              <EmailCustomInput
                type={InputType.PhoneNumber}
                text="Please enter a valid phone number."
                value={form.phoneNumber}
                onChange={handleChange("phoneNumber")}
                error={errors.phoneNumber}
              />
            </div>
          </div>

          <div className={s.colum_wrapper}>
            <div className={s.title}>Email</div>
            <div className={s.input}>
              <EmailCustomInput
                type={InputType.Email}
                text="example@example.com"
                value={form.email}
                onChange={handleChange("email")}
                error={errors.email}
              />
            </div>
          </div>

          <div className={s.colum_wrapper}>
            <div className={s.title}>Product</div>
            <div className={s.input}>
              <EmailCustomInput
                type={InputType.Text}
                text="example@example.com"
                value={form.email}
                onChange={handleChange("email")}
                error={errors.email}
              />
            </div>
          </div>
        </div>

        <div className={s.send_massage}>
          <span className={s.text}>Send a message</span>
          <textarea
            className={`${s.textarea} ${errors.message ? s.textareaError : ""}`}
            placeholder="Type here ..."
            name="message"
            id="message-input"
            value={form.message}
            onChange={handleTextAreaChange}
          />
          {errors.message && <span className={s.error}>{errors.message}</span>}
        </div>

        <button type="submit" className={s.submit_button}>
          Submit
        </button>
      </form>
    </div>
  );
}
