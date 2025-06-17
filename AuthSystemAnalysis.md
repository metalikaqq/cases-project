# Аналіз системи авторизації в проекті

## 1. Загальна архітектура

Система авторизації в проекті побудована за сучасними стандартами веб-розробки з використанням:

- React Context API для управління станом авторизації
- JWT токенів для автентифікації запитів
- Next.js для маршрутизації
- React Hook Form та Zod для валідації форм
- TypeScript для типізації та безпеки коду
- Axios для HTTP запитів на сервер

## 2. Компоненти системи авторизації

### 2.1. AuthContext

Центральний компонент системи - контекст авторизації `AuthContext.tsx`. Він відповідає за:

- Збереження стану авторизації користувача
- Надання доступу до цього стану всім компонентам через хук `useAuth`
- Реалізацію основних методів для автентифікації, реєстрації та керування користувачем

```tsx
// Приклад AuthContext.tsx
'use client';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {
  AuthContextType,
  AuthState,
  LoginRequest,
  RegisterRequest,
  // інші інтерфейси
} from '@/types/auth';
import * as authApi from '@/api/routes/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Ініціалізація стану авторизації з localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const userStr = localStorage.getItem('user');

        if (token && userStr) {
          const user = JSON.parse(userStr);
          // Перевірка валідності токена
          // ...
        }
      } catch (error) {
        // Обробка помилок
      }
    };

    initializeAuth();
  }, []);

  // Функції для роботи з авторизацією
  const login = async (credentials: LoginRequest) => {
    /* ... */
  };
  const register = async (data: RegisterRequest) => {
    /* ... */
  };
  const logout = () => {
    /* ... */
  };
  // Інші методи...

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

### 2.2. Типи даних для авторизації

В проекті використовуються TypeScript інтерфейси для типізації всіх операцій автентифікації:

```typescript
// Приклад auth.ts
// Інтерфейс користувача
export interface User {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN';
  isEmailVerified?: boolean;
  emailVerifiedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Інтерфейс запиту на авторизацію
export interface LoginRequest {
  email: string;
  password: string;
}

// Інтерфейс відповіді після успішної авторизації
export interface LoginResponse {
  access_token: string;
  user: User;
}

// Стан авторизації
export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Інтерфейс контексту авторизації
export interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<AuthResponse<LoginResponse>>;
  register: (data: RegisterRequest) => Promise<AuthResponse<RegisterResponse>>;
  logout: () => void;
  // Інші методи...
}
```

### 2.3. Компонент захисту маршрутів (ProtectedRoute)

Компонент `ProtectedRoute` забезпечує захист сторінок від неавторизованого доступу:

```tsx
// Приклад ProtectedRoute.tsx
'use client';
import React, { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  requireVerification?: boolean;
  redirectTo?: string;
  fallback?: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requireVerification = false,
  redirectTo = '/login',
  fallback = <div className="loading">Loading...</div>,
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(
    () => {
      if (!isLoading) {
        if (requireAuth && !isAuthenticated) {
          router.push(redirectTo);
          return;
        }

        if (requireVerification && user && !user.isEmailVerified) {
          router.push('/en/verify-email-pending');
          return;
        }
      }
    },
    [
      /* dependencies */
    ]
  );

  // Логіка відображення вмісту
  // ...
};
```

## 3. API для автентифікації

В проекті використовується клієнт Axios для взаємодії з бекендом:

```typescript
// Приклад auth.ts (API routes)
import axios from 'axios';
import axiosClient from '../axiosClient';
import {
  AuthResponse,
  LoginRequest,
  LoginResponse,
  // інші інтерфейси
} from '@/types/auth';

const API_BASE_URL = 'http://localhost:3000';

export const login = async (
  credentials: LoginRequest
): Promise<AuthResponse<LoginResponse>> => {
  try {
    const response = await axiosClient.post(
      `${API_BASE_URL}/auth/login`,
      credentials
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
};

export const register = async (
  userData: RegisterRequest
): Promise<AuthResponse<RegisterResponse>> => {
  // Реалізація реєстрації
  // ...
};

// Інші методи API...
```

### 3.1. Інтерцептори для JWT

Конфігурація Axios для автоматичного додавання JWT токену до запитів:

```typescript
// Приклад axiosClient.ts
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.BACKEND_API_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Інтерцептор запитів для додавання токена авторизації
axiosClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Інтерцептор відповідей для обробки помилок авторизації
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      // Перевірка, чи не знаходимось на сторінці верифікації
      const currentPath = window.location.pathname;
      const isVerificationPage =
        currentPath.includes('/verify-email') ||
        currentPath.includes('/auth/verify-email');

      if (!isVerificationPage) {
        // Токен недійсний, очищаємо і перенаправляємо на логін
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
```

## 4. Форми авторизації

### 4.1. Валідація форм з використанням Zod

Для валідації форм використовується бібліотека Zod з React Hook Form:

```typescript
// Приклад validationSchemas.ts
import { z } from 'zod';

// Схема валідації для форми входу
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Схема валідації для форми реєстрації
export const registerSchema = z
  .object({
    email: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    confirmPassword: z.string(),
    role: z.enum(['USER', 'ADMIN']).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Інші схеми валідації...
```

### 4.2. Приклад форми входу

```tsx
// Приклад login/page.tsx
'use client';
import React, { useState } from 'react';
import s from './page.module.scss';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useRouter } from '@/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/utils/validationSchemas';

const LoginPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await login(data);
      if (response.success) {
        router.push('/account');
      } else {
        setLoginError(response.error || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // JSX форми
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      {/* Поля форми */}
    </form>
  );
};

export default LoginPage;
```

## 5. Додаткові функції авторизації

### 5.1. Верифікація електронної пошти

Реалізовано повний цикл верифікації електронної пошти:

```tsx
// Приклад з AuthContext.tsx
const verifyEmail = async (
  token: string
): Promise<AuthResponse<VerifyEmailResponse>> => {
  try {
    const response = await authApi.verifyEmail({ token });

    if (response.success && response.data) {
      const { access_token, user } = response.data;

      // Зберігаємо токен і дані користувача
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user', JSON.stringify(user));

      setAuthState({
        user,
        token: access_token,
        isLoading: false,
        isAuthenticated: true,
      });
    }

    return response;
  } catch (error) {
    console.error('Email verification error:', error);
    throw error;
  }
};
```

### 5.2. Скидання пароля

У проекті реалізовано функціонал скидання пароля:

```typescript
// API запиту на скидання пароля
export const requestPasswordReset = async (
  data: PasswordResetRequest
): Promise<AuthResponse<PasswordResetResponse>> => {
  try {
    const response = await axiosClient.post(
      `${API_BASE_URL}/auth/password-reset`,
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
};

// API підтвердження нового пароля
export const confirmPasswordReset = async (
  data: PasswordResetConfirmRequest
): Promise<AuthResponse<void>> => {
  try {
    const response = await axiosClient.post(
      `${API_BASE_URL}/auth/password-reset/confirm`,
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
};
```

### 5.3. Зміна пароля

```typescript
// API зміни пароля
export const changePassword = async (
  data: ChangePasswordRequest
): Promise<AuthResponse<void>> => {
  try {
    const response = await axiosClient.post(
      `${API_BASE_URL}/auth/change-password`,
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
};
```

## 6. Безпека

### 6.1. Зберігання JWT токену

Для безпечного зберігання JWT токену використовується `localStorage`:

```typescript
// Зберігання токену під час входу
localStorage.setItem('access_token', access_token);
localStorage.setItem('user', JSON.stringify(user));

// Видалення токену під час виходу
localStorage.removeItem('access_token');
localStorage.removeItem('user');
```

### 6.2. Перевірка валідності токену

При кожному завантаженні додатку відбувається перевірка валідності токену:

```typescript
// Перевірка валідності токену при завантаженні програми
useEffect(() => {
  const initializeAuth = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const userStr = localStorage.getItem('user');

      if (token && userStr) {
        const user = JSON.parse(userStr);

        // Верифікація токену через запит до API
        try {
          const profileResponse = await authApi.getProfile();
          if (profileResponse.success && profileResponse.data) {
            // Токен валідний
            setAuthState({
              user: profileResponse.data,
              token,
              isLoading: false,
              isAuthenticated: true,
            });
          }
        } catch (error) {
          // Токен недійсний
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');
        }
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
    }
  };

  initializeAuth();
}, []);
```

## 7. Висновки

Система авторизації в проекті реалізована з використанням сучасних технологій та практик:

1. **Архітектурний підхід**: Використання React Context API для глобального стану авторизації
2. **Безпека**: JWT токени для автентифікації та авторизації
3. **Типізація**: TypeScript для безпеки типів та запобігання помилкам
4. **Валідація**: Zod для валідації форм вводу
5. **Управління API**: Axios для централізованої роботи з HTTP запитами
6. **Захист маршрутів**: Компоненти ProtectedRoute та GuestOnlyRoute для обмеження доступу
7. **Повний цикл автентифікації**: Реєстрація, верифікація, вхід, зміна пароля, скидання пароля, вихід

Система є масштабованою і може бути легко розширена для підтримки додаткових функцій автентифікації, таких як OAuth, багатофакторна автентифікація тощо.

## 8. Структура проекту та основні сторінки

### 8.1. Загальна структура проекту

Проект побудований з використанням Next.js і має таку структуру каталогів:

```
src/
  api/                  // API-клієнти для взаємодії з сервером
    axiosClient.ts      // Налаштований Axios клієнт з інтерцепторами
    axiosConfig.ts      // Конфігурація для Axios
    routes/             // API маршрути
      auth.ts           // Автентифікаційні запити
      products.ts       // Робота з продуктами

  app/                  // Структура додатку Next.js
    layout.tsx          // Головний макет
    page.tsx            // Головна сторінка
    [locale]/           // Локалізовані маршрути
      login/            // Сторінка входу
      register/         // Сторінка реєстрації
      profile/          // Сторінка профілю користувача
      auth/             // Автентифікаційні сторінки
        verify-email/   // Сторінка верифікації email

  components/           // Повторно використовувані компоненти
    Auth/               // Компоненти автентифікації
      ProtectedRoute.tsx  // Захищені маршрути
    Header/             // Компоненти заголовка
    Footer/             // Компоненти підвалу

  contexts/             // Контексти React
    AuthContext.tsx     // Контекст автентифікації

  hooks/                // Кастомні React-хуки
    useFormSubmission.ts  // Хук для роботи з формами

  models/               // Інтерфейси та моделі даних
    UserCredentialsModel.ts  // Модель даних користувача

  types/                // TypeScript типи
    auth.ts             // Типи для автентифікації

  utils/                // Утиліти
    validationSchemas.ts  // Схеми валідації форм
    verificationUtils.ts  // Утиліти верифікації
```

### 8.2. Основні сторінки

#### 8.2.1. Головна сторінка (`/`)

Головна сторінка проекту представляє основну інформацію про сервіс. Залежно від стану автентифікації, головна сторінка може показувати:

- Для неавтентифікованих користувачів: загальну інформацію та заклик до реєстрації
- Для автентифікованих користувачів: персоналізований контент та швидкий доступ до функцій

```tsx
// Приклад відображення персоналізованої інформації для автентифікованого користувача
{
  isAuthenticated && user && (
    <section className={s.welcomeMessage}>
      <h2>Welcome back, {user.email?.split('@')[0]}!</h2>
      <div className={s.quickActions}>
        <Link href="/profile" className={s.actionLink}>
          View Profile
        </Link>
        {!user.isEmailVerified && (
          <Link href="/en/verify-email-pending" className={s.actionLink}>
            Complete Email Verification
          </Link>
        )}
        <Link href="/cases" className={s.actionLink}>
          Browse Cases
        </Link>
      </div>
    </section>
  );
}
```

#### 8.2.2. Сторінка входу (`/login`)

Сторінка входу містить форму з полями:

- Email
- Пароль
- Опція "Показати пароль"
- Посилання "Забули пароль"
- Посилання на реєстрацію

Форма використовує React Hook Form із Zod для валідації вхідних даних.

#### 8.2.3. Сторінка реєстрації (`/register`)

Сторінка реєстрації дозволяє новим користувачам створити обліковий запис. Містить форму з полями:

- Email
- Пароль
- Підтвердження пароля

Після успішної реєстрації користувач перенаправляється на сторінку очікування верифікації.

#### 8.2.4. Сторінка профілю (`/profile`)

Сторінка профілю доступна тільки для автентифікованих користувачів (захищена через `ProtectedRoute`). На ній користувач може:

- Переглядати свою інформацію (email, статус верифікації, роль)
- Змінювати пароль
- Вийти із системи

```tsx
// Приклад вмісту сторінки профілю
<div className={s.userInfo}>
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
```

#### 8.2.5. Сторінка очікування верифікації (`/verify-email-pending`)

На цю сторінку перенаправляється користувач після реєстрації. Вона інформує користувача про необхідність перевірити електронну пошту та підтвердити адресу. Також містить функцію повторного надсилання листа верифікації.

#### 8.2.6. Сторінка верифікації (`/auth/verify-email`)

Ця сторінка обробляє токен верифікації з електронного листа. Вона автоматично верифікує користувача при завантаженні і показує один із наступних станів:

- Завантаження
- Успіх (з автоматичним входом)
- Помилка
- Неправильний токен
- Вже верифікований

#### 8.2.7. Сторінка скидання пароля (`/password-reset`)

Дозволяє користувачам запросити скидання пароля, ввівши свою email-адресу.

#### 8.2.8. Сторінка підтвердження скидання пароля (`/password-reset/confirm`)

На цій сторінці користувач може встановити новий пароль після переходу за посиланням із листа про скидання пароля.

### 8.3. Навігація та інтеграція автентифікації

Компонент `Header` динамічно змінює навігаційні посилання залежно від стану автентифікації:

```tsx
{
  isAuthenticated ? (
    <>
      <Link href="/profile">Profile</Link>
      <button onClick={logout}>Logout</button>
    </>
  ) : (
    <>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
    </>
  );
}
```

Це забезпечує зручну навігацію та чіткий шлях користувача в системі автентифікації.
