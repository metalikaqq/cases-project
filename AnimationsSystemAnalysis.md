# Аналіз системи анімацій в проекті

## 1. Загальна архітектура анімацій

Система анімацій у проекті побудована за сучасними стандартами веб-розробки з використанням:
- SCSS-міксинів для створення багаторазових анімацій
- React hooks для керування анімаціями на основі видимості елементів
- Intersection Observer API для ефективного відстеження появи елементів у видимій області екрану
- CSS keyframes та transitions для плавних візуальних ефектів
- Staggered animations (анімації з затримкою) для послідовного показу елементів

## 2. Основні компоненти системи анімацій

### 2.1. SCSS-міксини для анімацій

Центральним компонентом системи є файл `animations.scss`, який містить набір міксинів для різних типів анімацій:

```scss
// Приклад з animations.scss
@mixin fadeInUp($duration: 0.8s, $distance: 30px, $delay: 0s) {
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY($distance);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  opacity: 0;
  animation: fadeInUp $duration cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: $delay;
}
```

Основні типи анімацій:

1. **fadeInUp** - поява елемента знизу вгору з ефектом прозорості
2. **fadeInDown** - поява елемента зверху вниз
3. **fadeInLeft** - поява елемента зліва направо
4. **fadeInRight** - поява елемента справа наліво
5. **scaleIn** - поява елемента з ефектом масштабування
6. **slideInLeft** - ковзання елемента зліва направо
7. **slideInRight** - ковзання елемента справа наліво
8. **rotateIn** - поява елемента з обертанням
9. **bounceIn** - поява елемента з ефектом відскоку

### 2.2. React хук useScrollAnimation

Хук `useScrollAnimation` є ключовим елементом системи, який дозволяє запускати анімації при прокрутці сторінки:

```typescript
// Приклад з useScrollAnimation.ts
const useScrollAnimation = <T extends HTMLElement = HTMLElement>(
  options: UseScrollAnimationOptions = {}
): [MutableRefObject<T | null>, boolean] => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    delay = 0,
    triggerOnce = true,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          } else {
            setIsVisible(true);
          }

          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, delay, triggerOnce]);

  return [elementRef, isVisible];
};
```

Хук повертає:
1. `elementRef` - посилання на DOM-елемент для спостереження
2. `isVisible` - булеве значення, що показує, чи елемент у видимій області

## 3. Анімації на головній сторінці

На головній сторінці реалізовано кілька типів анімацій для покращення користувацького досвіду:

### 3.1. Банер з анімацією

Головний банер (`PresentationalBanner`) має стильну анімацію, що захоплює увагу користувача:

```tsx
// Приклад використання на головній сторінці
<div className={s.presentation_wrapper}>
  <PresentationalBanner
    imgSrc={mainBannerImg}
    title="BETTER TOURING"
    subtitle="THINK OUTSIDE THE BOX"
    topIndent={40}
    subtitleAsButton
  />
</div>
```

### 3.2. Секції з анімацією при прокрутці

Секції з анімацією при прокрутці (`AnimatedPreviewSection`) з'являються поступово при скролінгу:

```tsx
<div
  ref={sectionsRef}
  className={`${s.main__sections} ${isSectionsVisible ? s.animate_sections : ''}`}
>
  <AnimatedPreviewSection
    titleText={t2('1Title')}
    description={t2('2Description')}
    textPosition={TextPosition.Left}
    more={t2('1Section')}
    imgSrc={casesLoadingImg}
  />
  {/* Інші секції... */}
</div>
```

SCSS для анімації секцій:

```scss
.animate_sections {
  @include fadeInUp(0.8s, 40px);
  @include staggeredAnimation(0.3s, 0.4s);
}
```

### 3.3. Компонент AnimatedPreviewSection

Компонент `AnimatedPreviewSection` використовує різні анімації для тексту та зображень:

```tsx
// Окремі анімації для тексту та зображень
const [textRef, isTextVisible] = useScrollAnimation<HTMLDivElement>({
  animationType:
    textPosition === TextPosition.Left ? 'slideInLeft' : 'slideInRight',
  delay: 200,
  threshold: 0.2,
});

const [imageRef, isImageVisible] = useScrollAnimation<HTMLDivElement>({
  animationType:
    textPosition === TextPosition.Left ? 'slideInRight' : 'slideInLeft',
  delay: 400,
  threshold: 0.2,
});
```

А потім застосовує CSS класи на основі видимості:

```tsx
<div
  ref={textRef}
  className={classNames(
    previewStyles.preview_section__main_text,
    textSideClass,
    {
      [s.slideInLeft]:
        isTextVisible && textPosition === TextPosition.Left,
      [s.slideInRight]:
        isTextVisible && textPosition === TextPosition.Right,
    }
  )}
>
```

## 4. Staggered Animation (анімація з затримкою)

Ефект послідовної появи елементів реалізовано за допомогою міксину `staggeredAnimation`:

```scss
@mixin staggeredAnimation($base-delay: 0.1s, $increment: 0.1s) {
  > * {
    &:nth-child(1) {
      animation-delay: $base-delay;
    }

    &:nth-child(2) {
      animation-delay: $base-delay + $increment;
    }

    &:nth-child(3) {
      animation-delay: $base-delay + ($increment * 2);
    }

    // Інші дочірні елементи...
  }
}
```

Це дозволяє елементам з'являтися один за одним з вказаною затримкою, створюючи більш природний та привабливий ефект.

## 5. Інтерактивні анімації при наведенні

Проект також включає анімації при взаємодії з користувачем:

```scss
@mixin hoverFloat($duration: 0.3s, $distance: -5px) {
  transition: transform $duration ease-in-out;

  &:hover {
    transform: translateY($distance);
  }
}

@mixin hoverScale($scale: 1.05, $duration: 0.3s) {
  transition: transform $duration ease-in-out;

  &:hover {
    transform: scale($scale);
  }
}
```

Ці міксини додаються до елементів для створення ефекту при наведенні курсора:

```scss
.hover_button {
  @include hoverScale(1.05, 0.2s);
  position: relative;
  overflow: hidden;
}

.hover_image {
  @include hoverScale(1.02, 0.3s);
  transition:
    transform 0.3s ease-in-out,
    filter 0.3s ease-in-out;

  &:hover {
    filter: brightness(1.1);
  }
}
```

## 6. Параметризовані анімації

Усі анімації в системі можна налаштовувати за допомогою параметрів:

1. **duration** - тривалість анімації
2. **delay** - затримка перед початком анімації
3. **distance** - відстань переміщення (для fadeIn/slideIn анімацій)
4. **scale** - масштаб (для ефектів масштабування)
5. **rotation** - кут обертання (для rotateIn анімації)

Це дає можливість тонкого налаштування анімацій для різних контекстів та елементів.

## 7. Приклади використання на головній сторінці

### 7.1. Заголовок сторінки

```tsx
<MainPageTitle titleText={t('Title')} subTitleText={t('SubTitle')} />
```

Компонент `MainPageTitle` анімується при появі на екрані, привертаючи увагу до заголовка.

### 7.2. Секція елементів вибору

```tsx
<MainSelection />
```

Компонент `MainSelection` використовує анімації для плавної появи карток елементів.

### 7.3. Інформаційні секції

```tsx
<AnimatedPreviewSection
  titleText={t2('1Title')}
  description={t2('2Description')}
  textPosition={TextPosition.Left}
  more={t2('1Section')}
  imgSrc={casesLoadingImg}
/>
```

Кожна секція `AnimatedPreviewSection` має свої власні анімації для тексту та зображень, які запускаються при прокрутці до них.

## 8. Переваги реалізованої системи анімацій

1. **Продуктивність** - використання Intersection Observer API замість подій прокрутки та requestAnimationFrame суттєво підвищує продуктивність
2. **Повторне використання** - систему анімацій легко застосувати до будь-яких нових компонентів
3. **Гнучкість** - кожна анімація підтримує широкий набір налаштовуваних параметрів
4. **Модульність** - анімації організовані в окремі файли та компоненти для полегшення підтримки
5. **Прогресивний досвід** - анімації покращують сприйняття сайту, але не перешкоджають основній функціональності

## 9. Висновки

Система анімацій на сайті використовує найкращі сучасні практики для створення візуально привабливого та відзивчивого користувацького інтерфейсу. Поєднання CSS анімацій з React хуками дозволяє створювати складні анімації, які коректно працюють на різних пристроях та браузерах. Використання Intersection Observer API забезпечує плавність анімацій та оптимальну продуктивність, що особливо важливо на мобільних пристроях.

Анімації на головній сторінці значно покращують користувацький досвід, виділяючи ключові елементи та направляючи увагу користувача на важливий контент. При цьому анімації не відволікають від основного вмісту сайту, а лише доповнюють його.
