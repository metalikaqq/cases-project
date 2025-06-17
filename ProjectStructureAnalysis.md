# Структура проекту та основні сторінки

## 1. Загальна структура проекту

Проект побудовано з використанням сучасної архітектури Next.js з організацією файлів за App Router методологією, що забезпечує оптимальну структуру для масштабування та підтримки коду.

### 1.1. Основні директорії

```
src/
  api/                // API-клієнти для роботи з сервером
    axiosClient.ts    // Основний HTTP-клієнт
    axiosConfig.ts    // Конфігурація axios (interceptors, headers)
    routes/           // Організовані API-маршрути
      auth.ts         // Методи API для авторизації
      products.ts     // Методи API для продуктів
    mockData/         // Тестові дані для розробки

  app/                // Основні компоненти сторінок (App Router)
    layout.tsx        // Головний лейаут додатку
    page.tsx          // Головна сторінка (перенаправлення)
    [locale]/         // Локалізовані маршрути
      globals.css     // Глобальні стилі
      layout.tsx      // Лейаут для локалізованих сторінок
      page.tsx        // Головна сторінка
      login/          // Сторінка входу
      register/       // Сторінка реєстрації
      verify-email-pending/ // Сторінка очікування верифікації
      auth/           // Маршрути авторизації
      account/        // Сторінка облікового запису
      profile/        // Сторінка профілю
      password-reset/ // Сторінки відновлення пароля
      cases/          // Сторінка товарів/кейсів
      about-us/       // Сторінка про нас
      [product]/      // Динамічний маршрут для сторінок продуктів
    api/              // API-маршрути на стороні сервера Next.js

  assets/             // Статичні ресурси
    image/            // Зображення
    svg/              // SVG іконки
    video/            // Відеофайли

  components/         // Багаторазові компоненти
    Auth/             // Компоненти для авторизації
    CasesSelection/   // Компоненти вибору кейсів
    ContactForm/      // Форма контактів
    EmailForm/        // Форма електронної пошти
    ErrorDisplay/     // Відображення помилок
    FeatureSection/   // Секції з функціями
    Footer/           // Підвал сайту
    Header/           // Шапка сайту
    GlobalLoader/     // Глобальний індикатор завантаження
    Main/             // Основні компоненти сторінки
    MainSelection/    // Вибір продуктів на головній
    PresentationalBanner/ // Рекламні банери
    RoadCases/        // Компоненти для відображення кейсів

  contexts/           // React Context
    AuthContext.tsx   // Контекст автентифікації користувача
    GlobalLoaderContext.tsx // Контекст глобального завантажувача

  hooks/              // Кастомні React-хуки
    useEmailForm.ts   // Хук для роботи з формою
    useScrollAnimation.ts // Хук для анімацій при скролінгу
    useDraggableScroll.tsx // Хук для перетягування скролу
    useProduct.ts     // Хук для роботи з продуктами
    __tests__/        // Тести для хуків

  models/             // TypeScript інтерфейси та типи
    UserCredentialsModel.ts // Модель даних користувача
    UserDataModel.ts  // Розширена модель даних
    SingInModel.ts    // Модель для входу

  styles/             // Глобальні стилі
    fonts.css         // Шрифти

  types/              // TypeScript типи
    auth.ts           // Типи для авторизації
    product.ts        // Типи для продуктів
    emailForm.ts      // Типи для форм email

  UI/                 // Базові UI компоненти
    BlueButton/       // Кнопка з синім оформленням
    CustomInput/      // Кастомні поля вводу
    Modal/            // Модальні вікна
    LanguagePicker/   // Вибір мови

  utils/              // Утиліти та допоміжні функції
    animations.scss   // SCSS для анімацій
    apiUtils.ts       // Утиліти для API
    emailValidation.ts // Валідація email
    formValidation.ts // Валідація форм
    productUtils.ts   // Утиліти для продуктів
    mixins.scss       // SCSS міксини
    vars.scss         // SCSS змінні
    __tests__/        // Тести для утиліт

messages/            // Локалізовані тексти
  en.json            // Англійська локалізація
  ua.json            // Українська локалізація

public/              // Публічні статичні файли
```

### 1.2. Організація коду

Проект слідує принципам компонентно-орієнтованої архітектури з чітким розділенням відповідальності:

1. **Atomic Design** - компоненти організовано від найпростіших (UI) до складних (Контейнери)
2. **Feature-based Structure** - пов'язані компоненти знаходяться в спільних директоріях
3. **Type Safety** - всі типи строго визначені через TypeScript інтерфейси
4. **CSS Modules** - стилі інкапсульовані на рівні компонентів для уникнення конфліктів

## 2. Основні сторінки

### 2.1. Головна сторінка (Home)

**Шлях:** `/[locale]/page.tsx`

Головна сторінка є вхідною точкою сайту і містить наступні компоненти:

```tsx
export default function Home() {
  // ...
  return (
    <>
      <div className={s.presentation_wrapper}>
        <PresentationalBanner
          imgSrc={mainBannerImg}
          title="BETTER TOURING"
          subtitle="THINK OUTSIDE THE BOX"
          topIndent={40}
          subtitleAsButton
        />
      </div>

      <main className={s.main}>
        <MainPageTitle titleText={t('Title')} subTitleText={t('SubTitle')} />

        <MainSelection />

        <div
          ref={sectionsRef}
          className={`${s.main__sections} ${isSectionsVisible ? s.animate_sections : ''}`}
        >
          <AnimatedPreviewSection />
          <AnimatedPreviewSection />
          <AnimatedPreviewSection />
        </div>
      </main>
    </>
  );
}
```

**Особливості:**

- Великий презентаційний банер з затягуючою анімацією
- Секція вибору продуктів (MainSelection)
- Інформаційні секції, що анімуються при прокрутці
- Адаптивний дизайн для всіх розмірів екранів

### 2.2. Сторінка входу (Login)

**Шлях:** `/[locale]/login/page.tsx`

Сторінка входу користувача в систему з можливістю автентифікації:

```tsx
const LoginPage = () => {
  // Стан форми, обробка помилок, хуки
  // ...

  const onSubmit = async (data: LoginFormData) => {
    // Логіка авторизації
    // ...
  };

  return (
    <div className={s.loginContainer}>
      <div className={s.formWrapper}>
        <h1 className={s.title}>SIGN IN</h1>

        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          {/* Поля форми, кнопки */}
          {/* ... */}
        </form>
      </div>
    </div>
  );
};
```

**Особливості:**

- Валідація форми з використанням React Hook Form та Zod
- Обробка різних видів помилок авторизації
- Інтеграція з контекстом авторизації
- Посилання на реєстрацію та відновлення пароля

### 2.3. Сторінка реєстрації (Register)

**Шлях:** `/[locale]/register/page.tsx`

Сторінка для створення нового облікового запису:

```tsx
const RegisterForm = () => {
  // Стан форми, обробка помилок
  // ...

  const onSubmit = async (data: RegisterFormData) => {
    // Логіка реєстрації
    // ...
  };

  return (
    <div className={s.loginContainer}>
      <div className={s.formWrapper}>
        <h1 className={s.title}>CREATE ACCOUNT</h1>

        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          {/* Поля форми, кнопки */}
          {/* ... */}
        </form>
      </div>
    </div>
  );
};
```

**Особливості:**

- Розширена валідація паролю (складність, підтвердження)
- Перевірка унікальності email
- Автоматичний перехід на сторінку очікування верифікації після реєстрації

### 2.4. Сторінка профілю користувача (Profile)

**Шлях:** `/[locale]/profile/page.tsx`

Сторінка для управління профілем користувача:

```tsx
const ProfilePage = () => {
  const { user, logout, changePassword } = useAuth();

  // Стан форми, хуки
  // ...

  const onChangePassword = async (data: ChangePasswordFormData) => {
    // Логіка зміни паролю
    // ...
  };

  return (
    <ProtectedRoute>
      <div className={s.loginContainer}>
        <div className={s.formWrapper}>
          <h1 className={s.title}>PROFILE</h1>

          {/* Інформація користувача */}
          <div className={`${s.form} ${s.userInfo}`}>{/* ... */}</div>

          {/* Форма зміни паролю */}
          <form className={s.form} onSubmit={handleSubmit(onChangePassword)}>
            {/* ... */}
          </form>

          {/* Кнопка виходу */}
          <button
            onClick={handleLogout}
            className={`${s.submitButton} ${s.logoutButton}`}
          >
            LOGOUT
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
};
```

**Особливості:**

- Захист сторінки через компонент ProtectedRoute
- Відображення інформації користувача
- Можливість зміни паролю
- Кнопка виходу з системи

### 2.5. Сторінка товарів/кейсів (Cases)

**Шлях:** `/[locale]/cases/page.tsx`

Сторінка каталогу товарів (кейсів):

```tsx
export default function CasesPage() {
  // Логіка завантаження та фільтрації продуктів
  // ...

  return (
    <>
      <div className={s.banner_container}>
        <PresentationalBanner
          imgSrc={casesHeadBannerPic}
          title="CASES"
          subtitle="PROTECTIVE SOLUTIONS"
          topIndent={50}
          subtitleAsButton
        />
      </div>

      <main className={s.main}>
        <RoadCases products={products} isLoading={isLoading} error={error} />
      </main>
    </>
  );
}
```

**Особливості:**

- Презентаційний банер для категорії товарів
- Динамічне завантаження списку продуктів з API
- Компонент RoadCases для відображення сітки продуктів
- Обробка стану завантаження та помилок

### 2.6. Сторінка продукту (Product)

**Шлях:** `/[locale]/[product]/page.tsx`

Динамічна сторінка для детального перегляду окремого продукту:

```tsx
export default function ProductPage({ params }: ProductPageProps) {
  // Завантаження даних продукту
  // ...

  if (isLoading) {
    return <LoadingDisplay />;
  }

  if (error || !product) {
    return <ErrorDisplay message={error || 'Product not found'} />;
  }

  return (
    <div className={s.container}>
      <div className={s.product_header}>
        <h1>{product.title}</h1>
        <p>{product.subtitle}</p>
      </div>

      <div className={s.product_content}>
        <div className={s.product_image}>
          <Image src={product.image} alt={product.title} />
        </div>

        <div className={s.product_details}>{/* Деталі продукту */}</div>
      </div>

      <div className={s.related_products}>{/* Схожі продукти */}</div>
    </div>
  );
}
```

**Особливості:**

- Параметр динамічного маршруту для ID продукту
- Детальний перегляд характеристик продукту
- Галерея зображень продукту
- Секція рекомендованих схожих продуктів

### 2.7. Сторінка про нас (About Us)

**Шлях:** `/[locale]/about-us/page.tsx`

Інформаційна сторінка про компанію:

```tsx
export default function AboutUsPage() {
  // ...

  return (
    <>
      <div className={s.presentation_wrapper}>
        <PresentationalBanner
          imgSrc={aboutUsHeadBannerPic}
          title="ABOUT US"
          subtitle="OUR STORY"
          topIndent={50}
        />
      </div>

      <main className={s.main}>
        <div className={s.company_info}>
          <h2>Our Mission</h2>
          <p>{/* ... */}</p>
        </div>

        <div className={s.team_section}>{/* Команда */}</div>

        <div className={s.contact_section}>
          {/* Контактна форма */}
          <ContactForm />
        </div>
      </main>
    </>
  );
}
```

**Особливості:**

- Презентаційний банер
- Секції з інформацією про компанію
- Вбудована контактна форма
- Анімації при прокрутці для покращення користувацького досвіду

### 2.8. Сторінка верифікації email

**Шлях:** `/[locale]/auth/verify-email/page.tsx`

Сторінка для обробки верифікації електронної пошти:

```tsx
const VerifyEmailPage: React.FC = () => {
  // Логіка верифікації
  // ...

  useEffect(() => {
    // Обробка токена верифікації
    // ...
  }, [searchParams, verifyEmail, router]);

  // Різні стани верифікації (завантаження, успіх, помилка)
  const renderContent = () => {
    switch (state) {
      case 'loading':
        return (/* Компонент завантаження */);
      case 'success':
        return (/* Успішна верифікація */);
      case 'error':
        return (/* Помилка верифікації */);
      // Інші стани
    }
  };

  return (
    <div className="verification-page">
      {renderContent()}
    </div>
  );
};
```

**Особливості:**

- Обробка токена верифікації з URL
- Візуалізація різних станів процесу
- Автоматичний логін після успішної верифікації
- Зворотний відлік для перенаправлення

## 3. Загальна архітектура UI системи

### 3.1. Компонентний підхід

Інтерфейс користувача побудовано на принципах компонентного підходу з використанням:

1. **Композиції** - складні компоненти будуються з простіших
2. **Пропсів** - конфігурація компонентів через властивості
3. **Локального стану** - управління внутрішнім станом компоненту
4. **Контекстів** - глобальний стан для спільних даних

### 3.2. Адаптивний дизайн

Всі сторінки повністю адаптовані для різних розмірів екранів з використанням:

```scss
@mixin responsive($breakpoint) {
  @if $breakpoint == tablet-sm {
    @media (min-width: 576px) {
      @content;
    }
  } @else if $breakpoint == tablet {
    @media (min-width: 768px) {
      @content;
    }
  } @else if $breakpoint == desktop-sm {
    @media (min-width: 992px) {
      @content;
    }
  } @else if $breakpoint == desktop-md {
    @media (min-width: 1200px) {
      @content;
    }
  } @else if $breakpoint == desktop-lg {
    @media (min-width: 1400px) {
      @content;
    }
  }
}
```

Приклад використання:

```scss
.main {
  padding: 1rem;

  @include responsive(tablet) {
    padding: 2rem;
  }

  @include responsive(desktop-sm) {
    padding: 3rem;
  }
}
```

### 3.3. Система сіток

Для розташування елементів використовується комбінація Flexbox та CSS Grid:

```scss
.product_grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;

  @include responsive(desktop-sm) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }
}
```

## 4. Навігація та маршрутизація

### 4.1. Next.js App Router

Проект використовує нову систему маршрутизації Next.js App Router:

- Файлова система маршрутизації
- Вкладені маршрути (nested routes)
- Групи маршрутів
- Паралельні маршрути
- Перехоплення маршрутів (route interception)

### 4.2. Інтернаціоналізація маршрутів

Маршрути локалізовані з використанням параметра `[locale]`:

```tsx
// src/navigation.ts
import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['en', 'ua'] as const;
export const localePrefix = 'always';

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    localePrefix,
  });
```

### 4.3. Захищені маршрути

Захист маршрутів реалізовано через компонент `ProtectedRoute`:

```tsx
<ProtectedRoute
  requireAuth={true}
  requireVerification={true}
  redirectTo="/login"
>
  {/* Вміст захищеної сторінки */}
</ProtectedRoute>
```

## 5. Висновки

Структура проекту дотримується сучасних стандартів та практик розробки веб-додатків:

1. **Модульність** - кожен компонент має чітку відповідальність
2. **Масштабованість** - структура дозволяє легко додавати нові сторінки та функціонал
3. **Підтримуваність** - логічна організація файлів спрощує пошук та редагування
4. **Продуктивність** - оптимізація для швидкого завантаження та відображення сторінок
5. **UX/UI** - узгоджений дизайн з анімаціями для кращого досвіду користувача

Архітектура проекту забезпечує хороший баланс між функціональністю, продуктивністю та зручністю розробки, що дозволяє ефективно розвивати та підтримувати додаток протягом тривалого часу.
