# 📧 Повний гід по Email системі

## 📋 Зміст

1. [Як працює Backend Email система](#як-працює-backend-email-система)
2. [Налаштування Email сервісу](#налаштування-email-сервісу)
3. [API для відправки Email](#api-для-відправки-email)
4. [Frontend інтеграція](#frontend-інтеграція)
5. [Приклади коду](#приклади-коду)
6. [Відлагодження проблем](#відлагодження-проблем)

---

## 🏗️ Як працює Backend Email система

### Структура Email модуля

```
src/email/
├── email.controller.ts    # HTTP endpoint для відправки
├── email.service.ts       # Логіка відправки (Nodemailer)
├── email.module.ts        # NestJS модуль
└── dto/
    └── send-email.dto.ts  # Валідація вхідних даних
```

### Потік роботи Email системи

```
1. Frontend → POST /api/send-email → email.controller.ts
2. Controller → валідація даних через SendEmailDto
3. Controller → email.service.ts.sendContactEmail()
4. Service → створює HTML шаблон email
5. Service → підключається до Gmail SMTP
6. Service → відправляє email на ADMIN_EMAIL
7. Service → повертає результат у Frontend
```

---

## ⚙️ Налаштування Email сервісу

### 1. Змінні оточення (.env)

```env
# Email Configuration (Gmail SMTP)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER="allow.matalika@gmail.com"
EMAIL_PASSWORD="iwzd qjsv rfzh yvns"    # App Password від Gmail
EMAIL_FROM="allow.matalika@gmail.com"
ADMIN_EMAIL="allow.matalika@gmail.com"
```

### 2. Gmail App Password

Для роботи з Gmail SMTP потрібно:

1. Увійти в Google Account Security
2. Увімкнути 2-Factor Authentication
3. Створити App Password для додатку
4. Використовувати цей пароль в `EMAIL_PASSWORD`

### 3. SMTP налаштування

```typescript
// В email.service.ts використовується Nodemailer
const transporter = nodemailer.createTransporter({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true для 465, false для інших портів
  auth: {
    user: 'allow.matalika@gmail.com',
    pass: 'iwzd qjsv rfzh yvns',
  },
});
```

---

## 🔗 API для відправки Email

### Endpoint

```
POST http://localhost:3000/api/send-email
Content-Type: application/json
```

### Структура запиту (SendEmailDto)

```typescript
{
  firstName: string;        // Обов'язково - Ім'я відправника
  lastName: string;         // Обов'язково - Прізвище відправника
  email: string;            // Обов'язково - Email відправника
  phoneNumber: string;      // Необов'язково - Телефон
  message: string;          // Обов'язково - Текст повідомлення
  selectedValue?: string;   // Необов'язково - Тип послуги
}
```

### Приклад запиту

```json
{
  "firstName": "Іван",
  "lastName": "Петренко",
  "email": "ivan@example.com",
  "phoneNumber": "+380123456789",
  "message": "Хочу замовити консультацію з розробки",
  "selectedValue": "consultation"
}
```

### Структура відповіді

```typescript
// Успішна відповідь
{
  "success": true,
  "data": {
    "message": "Email sent successfully",
    "timestamp": "2025-06-04T18:25:20.252Z"
  },
  "error": null,
  "message": "Your message has been sent successfully. We will get back to you soon."
}

// Помилка валідації
{
  "success": false,
  "data": null,
  "error": "firstName should not be empty",
  "message": "Validation failed"
}

// Помилка відправки
{
  "success": false,
  "data": null,
  "error": "Failed to send email",
  "message": "SMTP connection failed"
}
```

---

## 💻 Frontend інтеграція

### 1. Email Service (TypeScript)

```typescript
// services/emailService.ts
interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
  selectedValue?: string;
}

interface EmailResponse {
  success: boolean;
  data: {
    message: string;
    timestamp: string;
  } | null;
  error: string | null;
  message: string | null;
}

export const sendContactEmail = async (
  data: ContactFormData
): Promise<EmailResponse> => {
  try {
    const response = await fetch('http://localhost:3000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to send email');
    }

    return result;
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
};
```

### 2. React компонент з правильною обробкою

```typescript
// ContactForm.tsx
import React, { useState } from 'react';
import { sendContactEmail } from './emailService';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
    selectedValue: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Валідація
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setSubmitStatus('error');
      setErrorMessage('Заповніть всі обов\'язкові поля');
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
        // Очистити форму
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          message: '',
          selectedValue: ''
        });
      } else {
        throw new Error(result.error || 'Невідома помилка');
      }
    } catch (error: any) {
      console.error('Помилка відправки:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Помилка відправки email');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Поля форми */}

      {submitStatus === 'success' && (
        <div style={{ color: 'green', padding: '10px', border: '1px solid green' }}>
          ✅ Повідомлення успішно відправлено! Ми зв'яжемося з вами найближчим часом.
        </div>
      )}

      {submitStatus === 'error' && (
        <div style={{ color: 'red', padding: '10px', border: '1px solid red' }}>
          ❌ {errorMessage}
        </div>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Відправляємо...' : 'Відправити повідомлення'}
      </button>
    </form>
  );
};
```

### 3. Axios варіант (якщо використовуєте Axios)

```typescript
// services/emailService.ts (Axios version)
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const emailAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 секунд
});

export const sendContactEmail = async (
  data: ContactFormData
): Promise<EmailResponse> => {
  try {
    const response = await emailAPI.post<EmailResponse>(
      '/api/send-email',
      data
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.error || 'Помилка відправки email');
    }
    if (error.code === 'ECONNREFUSED') {
      throw new Error(
        'Не можу підключитися до сервера. Перевірте чи запущений backend.'
      );
    }
    throw new Error('Мережева помилка. Перевірте підключення до інтернету.');
  }
};
```

### 4. Next.js варіант

```typescript
// pages/api/contact.ts (Next.js API route)
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch('http://localhost:3000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const result = await response.json();

    if (response.ok) {
      res.status(200).json(result);
    } else {
      res.status(response.status).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// components/ContactForm.tsx (Next.js)
const handleSubmit = async (data: ContactFormData) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return await response.json();
};
```

---

## 🔍 Що відбувається на Backend

### 1. Email Controller (src/email/email.controller.ts)

```typescript
@Post('send-email')
async sendEmail(@Body() sendEmailDto: SendEmailDto) {
  try {
    // Валідація даних автоматично через DTO
    const result = await this.emailService.sendContactEmail(sendEmailDto);

    return {
      success: true,
      data: {
        message: 'Email sent successfully',
        timestamp: new Date().toISOString(),
      },
      error: null,
      message: 'Your message has been sent successfully. We will get back to you soon.',
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error.message,
      message: 'Failed to send email',
    };
  }
}
```

### 2. Email Service (src/email/email.service.ts)

```typescript
async sendContactEmail(emailData: SendEmailDto) {
  // Створення HTML шаблону
  const htmlContent = `
    <h2>Нове повідомлення з сайту</h2>
    <p><strong>Ім'я:</strong> ${emailData.firstName} ${emailData.lastName}</p>
    <p><strong>Email:</strong> ${emailData.email}</p>
    <p><strong>Телефон:</strong> ${emailData.phoneNumber || 'Не вказано'}</p>
    <p><strong>Тип послуги:</strong> ${emailData.selectedValue || 'Не вказано'}</p>
    <p><strong>Повідомлення:</strong></p>
    <p>${emailData.message}</p>
    <hr>
    <p>Відправлено: ${new Date().toLocaleString('uk-UA')}</p>
  `;

  // Налаштування email
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.ADMIN_EMAIL,
    subject: `Нове повідомлення від ${emailData.firstName} ${emailData.lastName}`,
    html: htmlContent,
    replyTo: emailData.email,
  };

  // Відправка через Nodemailer
  await this.transporter.sendMail(mailOptions);
}
```

### 3. Валідація даних (src/email/dto/send-email.dto.ts)

```typescript
export class SendEmailDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsString()
  @IsOptional()
  selectedValue?: string;
}
```

---

## 🐛 Відлагодження проблем

### Часті помилки та рішення

#### 1. "ECONNREFUSED" - Backend не доступний

```
Проблема: Frontend не може підключитися до backend
Рішення:
- Перевірте чи запущений backend: npm run start:dev
- Перевірте URL: http://localhost:3000/api/send-email
- Перевірте порт в .env: PORT=3000
```

#### 2. "CORS error" - Заблоковано браузером

```
Проблема: Browser блокує запити між різними доменами
Рішення: Налаштувати CORS в main.ts:

app.enableCors({
  origin: ['http://localhost:3001', 'http://localhost:5173'], // Frontend URLs
  credentials: true,
});
```

#### 3. "Authentication failed" - SMTP помилка

```
Проблема: Gmail блокує вхід
Рішення:
- Використовуйте App Password замість звичайного пароля
- Увімкніть 2FA в Google Account
- Перевірте EMAIL_USER та EMAIL_PASSWORD в .env
```

#### 4. "Validation failed" - Невірні дані

```
Проблема: Frontend передає невірний формат даних
Рішення:
- Перевірте що всі обов'язкові поля заповнені
- firstName, lastName, email, message - обов'язкові
- email повинен бути валідним
```

#### 5. Timeout помилки

```
Проблема: Запит занадто довгий
Рішення:
- Збільшите timeout в frontend: timeout: 15000
- Перевірте швидкість інтернету
- Перевірте SMTP налаштування
```

### Перевірка через curl

```bash
# Тест backend endpoint
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Тест",
    "lastName": "Користувач",
    "email": "test@example.com",
    "phoneNumber": "+380123456789",
    "message": "Тестове повідомлення",
    "selectedValue": "consultation"
  }'
```

### Debug в Browser DevTools

```javascript
// Відкрийте Console в DevTools та запустіть:
fetch('http://localhost:3000/api/send-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: 'Тест',
    lastName: 'Користувач',
    email: 'test@example.com',
    message: 'Тестове повідомлення',
  }),
})
  .then((r) => r.json())
  .then(console.log)
  .catch(console.error);
```

---

## ✅ Чеклист для успішної інтеграції

### Backend (✅ Все готово)

- [x] Gmail SMTP налаштовано правильно
- [x] .env змінні встановлені
- [x] Email service працює
- [x] API endpoint `/api/send-email` доступний
- [x] Валідація даних працює

### Frontend (треба перевірити)

- [ ] Правильний URL до API (http://localhost:3000/api/send-email)
- [ ] Всі обов'язкові поля передаються (firstName, lastName, email, message)
- [ ] Обробка помилок реалізована
- [ ] CORS налаштовано (якщо потрібно)
- [ ] Loading states для UX
- [ ] Валідація email на frontend

### Тестування

1. Запустіть backend: `npm run start:dev`
2. Перевірте endpoint в браузері або Postman
3. Подивіться логи backend при відправці
4. Перевірте Network tab в DevTools
5. Перевірте Console на помилки JavaScript

---

**Ваш backend працює відмінно! 🎉 Тепер потрібно тільки правильно підключити frontend за цією інструкцією.**
