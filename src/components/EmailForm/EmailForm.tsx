// 'use client';

// import { useTranslations } from 'next-intl';
// import s from './EmailForm.module.scss';
// import { useState } from 'react';
// import EmailCustomInput from '@/UI/EmailCustomInput';
// import { InputType } from '@/UI/EmailCustomInput/EmailCustomInput';
// import { useEmailSend } from '@/hooks/useEmailSend';

// export type EmailFormProps = {
//   selectedValue: string;
// };

// export default function EmailForm(props: EmailFormProps) {
//   const t = useTranslations('ContactPage');
//   const { sendEmail, isLoading, error, clearError } = useEmailSend();

//   const [form, setForm] = useState({
//     firstName: '',
//     lastName: '',
//     phoneNumber: '',
//     email: '',
//     message: '',
//   });
//   const [errors, setErrors] = useState({
//     firstName: '',
//     lastName: '',
//     phoneNumber: '',
//     email: '',
//     message: '',
//   });

//   const [submitStatus, setSubmitStatus] = useState<
//     'idle' | 'success' | 'error'
//   >('idle');

//   const handleChange =
//     (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
//       const { value } = e.target;
//       setForm((prevForm) => ({
//         ...prevForm,
//         [field]: value,
//       }));
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         [field]: '',
//       }));
//     };

//   const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     const { value } = e.target;
//     setForm((prevForm) => ({
//       ...prevForm,
//       message: value,
//     }));
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       message: '',
//     }));
//   };

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = { ...errors };

//     // Enhanced validation with better error messages
//     if (!form.firstName.trim()) {
//       newErrors.firstName = t('FirstNameCannotBeBlank');
//       isValid = false;
//     } else if (form.firstName.trim().length < 2) {
//       newErrors.firstName = 'First name must be at least 2 characters';
//       isValid = false;
//     }

//     if (!form.lastName.trim()) {
//       newErrors.lastName = t('LastNameCannotBeBlank');
//       isValid = false;
//     } else if (form.lastName.trim().length < 2) {
//       newErrors.lastName = 'Last name must be at least 2 characters';
//       isValid = false;
//     }

//     if (!form.phoneNumber.trim()) {
//       newErrors.phoneNumber = t('PhoneNumberCannotBeBlank');
//       isValid = false;
//     } else if (!/^\d{3}\s\d{3}\s\d{4}$/.test(form.phoneNumber.trim())) {
//       newErrors.phoneNumber = 'Please enter a valid phone number';
//       isValid = false;
//     }

//     if (!form.email.trim()) {
//       newErrors.email = t('EmailCannotBeBlank');
//       isValid = false;
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
//       newErrors.email = 'Please enter a valid email address';
//       isValid = false;
//     }

//     if (!form.message.trim()) {
//       newErrors.message = t('MessageCannotBeBlank');
//       isValid = false;
//     } else if (form.message.trim().length < 10) {
//       newErrors.message = 'Message must be at least 10 characters';
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const formatPhoneNumberForSubmit = (
//     countryCode: string,
//     phoneNumber: string
//   ) => {
//     const cleaned = phoneNumber.replace(/\D/g, '');
//     const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
//     if (match) {
//       return `(${countryCode}) ${match[1]} ${match[2]} ${match[3]}`;
//     }
//     return phoneNumber;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     clearError();

//     const formattedPhoneNumber = formatPhoneNumberForSubmit(
//       '+380',
//       form.phoneNumber
//     );

//     const emailData = {
//       firstName: form.firstName,
//       lastName: form.lastName,
//       phoneNumber: formattedPhoneNumber,
//       email: form.email,
//       message: form.message,
//       selectedValue: props.selectedValue,
//     };

//     const success = await sendEmail(emailData);

//     if (success) {
//       setSubmitStatus('success');

//       // Reset form after successful submission
//       setForm({
//         firstName: '',
//         lastName: '',
//         phoneNumber: '',
//         email: '',
//         message: '',
//       });

//       // Clear success message after 5 seconds
//       setTimeout(() => setSubmitStatus('idle'), 5000);
//     } else {
//       setSubmitStatus('error');
//     }
//   };

//   return (
//     <div className={s.wrapper}>
//       <form className={s.email_request} onSubmit={handleSubmit}>
//         <h1 className={s.email_request__title}>{t('RequestQuote')}</h1>

//         <div className={s.contacts}>
//           <div className={s.colum_wrapper}>
//             <div className={s.title}>{t('Name')}</div>
//             <div className={s.colum}>
//               <div className={s.input}>
//                 <EmailCustomInput
//                   type={InputType.Text}
//                   text={t('FirstName')}
//                   value={form.firstName}
//                   onChange={handleChange('firstName')}
//                   error={errors.firstName}
//                   disabled={isLoading}
//                 />
//               </div>
//               <div className={s.input}>
//                 <EmailCustomInput
//                   type={InputType.Text}
//                   text={t('LastName')}
//                   value={form.lastName}
//                   onChange={handleChange('lastName')}
//                   error={errors.lastName}
//                   disabled={isLoading}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className={s.colum_wrapper}>
//             <div className={s.title}>{t('PhoneNumber')}</div>
//             <div className={s.input}>
//               <EmailCustomInput
//                 type={InputType.PhoneNumber}
//                 text={t('PleaseEnterValidPhoneNumber')}
//                 value={form.phoneNumber}
//                 onChange={handleChange('phoneNumber')}
//                 error={errors.phoneNumber}
//                 disabled={isLoading}
//               />
//             </div>
//           </div>

//           <div className={s.colum_wrapper}>
//             <div className={s.title}>{t('Email')}</div>
//             <div className={s.colum}>
//               <div className={s.input}>
//                 <EmailCustomInput
//                   type={InputType.Email}
//                   text={t('ExampleEmail')}
//                   value={form.email}
//                   onChange={handleChange('email')}
//                   error={errors.email}
//                   disabled={isLoading}
//                 />
//               </div>

//               <div className={s.input}>
//                 <input
//                   className={s.selected_item}
//                   value={props.selectedValue}
//                   type="text"
//                   disabled={isLoading}
//                   readOnly
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className={s.send_massage}>
//           <span className={s.text}>{t('SendMessage')}</span>
//           <textarea
//             className={`${s.textarea} ${errors.message ? s.textareaError : ''}`}
//             placeholder={t('TypeHere')}
//             name="message"
//             id="message-input"
//             value={form.message}
//             onChange={handleTextAreaChange}
//             disabled={isLoading}
//           />
//           {errors.message && <span className={s.error}>{errors.message}</span>}
//         </div>

//         {/* Status Messages */}
//         {submitStatus === 'success' && (
//           <div className={`${s.status_message} ${s.success_message}`}>
//             ✅ Your message has been sent successfully! We&apos;ll get back to
//             you soon.
//           </div>
//         )}

//         {(submitStatus === 'error' || error) && (
//           <div className={`${s.status_message} ${s.error_message}`}>
//             ❌ {error || 'There was an error sending your message. Please try again.'}
//           </div>
//         )}

//         <button
//           type="submit"
//           className={`${s.submit_button} ${isLoading ? s.submit_button_loading : ''}`}
//           disabled={isLoading}
//         >
//           {isLoading ? 'Sending...' : t('Submit')}
//         </button>
//       </form>
//     </div>
//   );
// }
