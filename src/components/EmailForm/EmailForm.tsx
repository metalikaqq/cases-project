"use client"

import { useTranslations } from 'next-intl';
import s from './EmailForm.module.scss';
import { useState } from 'react';
import EmailCustomInput from '@/UI/EmailCustomInput';
import { InputType } from '@/UI/EmailCustomInput/EmailCustomInput';

export type EmailFormProps = {
  // props go here
};

export default function EmailForm(props: EmailFormProps) {
  const t = useTranslations("ContactPage");

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

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
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
      newErrors.firstName = t("FirstNameCannotBeBlank");
      isValid = false;
    }
    if (!form.lastName) {
      newErrors.lastName = t("LastNameCannotBeBlank");
      isValid = false;
    }
    if (!form.phoneNumber) {
      newErrors.phoneNumber = t("PhoneNumberCannotBeBlank");
      isValid = false;
    }
    if (!form.email) {
      newErrors.email = t("EmailCannotBeBlank");
      isValid = false;
    }
    if (!form.message) {
      newErrors.message = t("MessageCannotBeBlank");
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
        <h1 className={s.email_request__title}>{t("RequestQuote")}</h1>

        <div className={s.contacts}>
          <div className={s.colum_wrapper}>
            <div className={s.title}>{t("Name")}</div>
            <div className={s.colum}>
              <div className={s.input}>
                <EmailCustomInput
                  type={InputType.Text}
                  text={t("FirstName")}
                  value={form.firstName}
                  onChange={handleChange("firstName")}
                  error={errors.firstName}
                />
              </div>
              <div className={s.input}>
                <EmailCustomInput
                  type={InputType.Text}
                  text={t("LastName")}
                  value={form.lastName}
                  onChange={handleChange("lastName")}
                  error={errors.lastName}
                />
              </div>
            </div>
          </div>

          <div className={s.colum_wrapper}>
            <div className={s.title}>{t("PhoneNumber")}</div>
            <div className={s.input}>
              <EmailCustomInput
                type={InputType.PhoneNumber}
                text={t("PleaseEnterValidPhoneNumber")}
                value={form.phoneNumber}
                onChange={handleChange("phoneNumber")}
                error={errors.phoneNumber}
              />
            </div>
          </div>

          <div className={s.colum_wrapper}>
            <div className={s.title}>{t("Email")}</div>
            <div className={s.colum}>
              <div className={s.input}>
                <EmailCustomInput
                  type={InputType.Email}
                  text={t("ExampleEmail")}
                  value={form.email}
                  onChange={handleChange("email")}
                  error={errors.email}
                />
              </div>

              <div className={s.input}>
                <EmailCustomInput
                  type={InputType.Email}
                  text={t("ExampleEmail")}
                  value={form.email}
                  onChange={handleChange("email")}
                  error={errors.email}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={s.send_massage}>
          <span className={s.text}>{t("SendMessage")}</span>
          <textarea
            className={`${s.textarea} ${errors.message ? s.textareaError : ""}`}
            placeholder={t("TypeHere")}
            name="message"
            id="message-input"
            value={form.message}
            onChange={handleTextAreaChange}
          />
          {errors.message && <span className={s.error}>{errors.message}</span>}
        </div>

        <button type="submit" className={s.submit_button}>
          {t("Submit")}
        </button>
      </form>
    </div>
  );
}

