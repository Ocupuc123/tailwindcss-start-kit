# Руководство по вёрстке для ИИ-агента

Этот файл содержит правила адаптации кода, сгенерированного плагином Figma to Code, под наш проект. Используйте его как шпаргалку при преобразовании HTML/Tailwind из Figma в корректные Twig-компоненты.

---

## 1. Контейнеры и сетка

### Контейнер по умолчанию

- **Не используйте** фиксированные ширины типа `w-[1360px]` для обёртки контента.
- **Используйте** утилиту `container` (определена в `src/styles/utils/utility.css`), которая:
  - Имеет максимальную ширину `1360px`
  - Отступы по бокам `15px`
  - Центрируется автоматически

**Неправильно:**

```html
<div class="mx-auto w-[1360px] px-[15px]">...</div>
```

**Правильно:**

```html
<div class="container">...</div>
```

### Вложенные контейнеры

Если внутри контейнера нужна ещё одна ограниченная ширина, используйте `max-w-...` из Tailwind (например, `max-w-4xl`), но предпочтительнее снова `container` (если это отдельная секция).

---

## 2. Адаптивность

### Брейкпоинты (Tailwind по умолчанию)

| Префикс | Min-width | Использование      |
| ------- | --------- | ------------------ |
| `sm:`   | 640px     | Телефоны (портрет) |
| `md:`   | 768px     | Планшеты           |
| `lg:`   | 1024px    | Ноутбуки           |
| `xl:`   | 1280px    | Десктопы           |
| `2xl:`  | 1536px    | Большие экраны     |

### Как адаптировать фиксированные размеры из Figma

Плагин часто выдаёт фиксированные ширины/высоты в пикселях. Заменяйте их на адаптивные аналоги:

**Неправильно (из Figma):**

```html
<div class="h-[100px] w-[200px]"></div>
```

**Правильно:**

```html
<div class="h-auto w-full md:min-h-[100px] md:w-[200px]"></div>
```

Или используйте относительные единицы (`max-w-full`, `w-full`).

### Преобразование flex-контейнеров в адаптивные grid-сетки

Плагин часто создаёт неадаптивные flex-контейнеры с `flex-1` и фиксированными gap. Заменяйте их на адаптивные grid-сетки:

**Неправильно (из Figma):**

```html
<div class="flex gap-5">
  <div class="flex-1">...</div>
  <div class="flex-1">...</div>
  <div class="flex-1">...</div>
</div>
```

**Правильно (адаптивная grid):**

```html
<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
  <div>...</div>
  <div>...</div>
  <div>...</div>
</div>
```

**Пример реального кода из Figma to Code:**

```html
<div class="inline-flex">
  <div class="flex-1"></div>
  <div class="flex-1"></div>
  <div class="flex-1"></div>
</div>
```

**Преобразованный адаптивный grid:**

```html
<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
  <div></div>
  <div></div>
  <div></div>
</div>
```

**Правила:**

- Используйте `grid` вместо `flex` для равномерного распределения колонок.
- Количество колонок должно адаптироваться: `grid-cols-1` на мобильных, `sm:grid-cols-2` на планшетах, `lg:grid-cols-3` на десктопах.
- Заменяйте фиксированные gap (например, `gap-5`) на адаптивные `gap-4 md:gap-6`.
- Если блоки должны занимать равную ширину, не используйте `flex-1` — grid автоматически распределит пространство.

---

## 3. Типографика

### Используйте CSS-переменные из темы

В `src/styles/base/theme.css` определены токены для заголовков:

| Токен          | CSS-переменная | Класс Tailwind (через `@apply`) |
| -------------- | -------------- | ------------------------------- |
| Заголовок H1   | `--text-h1`    | `text-h1`                       |
| Заголовок H2   | `--text-h2`    | `text-h2`                       |
| Заголовок H3   | `--text-h3`    | `text-h3`                       |
| Основной текст | `--text-base`  | `text-base`                     |

**Неправильно (жёсткие размеры из Figma):**

```html
<h1 class="text-[40px] leading-[1.2] font-bold">...</h1>
```

**Правильно:**

```html
<h1 class="text-h1 text-title">...</h1>
```

(где `text-title` добавляет `font-weight: 700` и `line-height: 1.2`)

### Шрифты

Основной шрифт – `Roboto` (переменная `--font-sans`). Используйте класс `font-sans`.

---

## 4. Цвета

### Кастомные цвета из темы

В `theme.css` определены:

| Токен                  | Значение (пример) | Класс Tailwind                                 |
| ---------------------- | ----------------- | ---------------------------------------------- |
| `--color-primary`      | `#8778fe`         | `bg-primary`, `text-primary`, `border-primary` |
| `--color-primary-dark` | `#6b5ce7`         | `bg-primary-dark`, `text-primary-dark`         |
| `--color-success`      | `#10b981`         | `bg-success`                                   |
| `--color-danger`       | `#ef4444`         | `bg-danger`                                    |
| `--color-muted`        | `#9ca3af`         | `text-muted`                                   |

**Неправильно (жёсткий HEX из Figma):**

```html
<div class="bg-[#8778fe] text-[#6b5ce7]">...</div>
```

**Правильно:**

```html
<div class="bg-primary text-primary-dark">...</div>
```

### Тёмная тема

Если в макете есть тёмная тема, используйте медиа-запрос `prefers-color-scheme` через Tailwind:

```html
<div class="bg-white text-gray-800 dark:bg-black dark:text-white">...</div>
```

---

## 5. Работа с изображениями

### Пути к изображениям

Все изображения лежат в `public/images/`. Используйте абсолютный путь `/images/...`.

**Неправильно (относительный путь из Figma):**

```html
<img src="./images/photo.jpg" alt="" />
```

**Правильно:**

```html
<img src="/images/photo.jpg" alt="" />
```

### Оптимизация

Изображения автоматически оптимизируются плагином `vite-plugin-image-optimizer`. Для фоновых изображений используйте `background-image` с указанием пути.

---

## 6. Компоненты Twig

### Структура компонентов

- Компоненты лежат в `src/components/`
- Макросы форм – `src/components/_ui/forms.twig`
- Страницы – `src/pages/` (расширяют `@layouts/main.twig`)

### Создание нового компонента

1. Создайте файл `src/components/имя.twig`
2. Определите блоки, если нужно
3. Подключите в странице через `{% include '@components/имя.twig' %}`

### Использование макросов форм

```twig
{% import '@components/_ui/forms.twig' as forms %}

{{
  forms.field_text({
    title: 'Имя',
    attrs: {
      name: 'name',
      placeholder: 'Введите имя'
    }
  })
}}
```

---

## 7. Пример полного преобразования

### Код из Figma to Code:

```html
<div class="mx-auto w-[1360px] px-[15px]">
  <div class="flex flex-wrap" style="gap: 30px;">
    <div class="h-[100px] w-[200px] bg-[#8778fe]"></div>
    <div class="h-[100px] w-[200px] bg-[#6b5ce7]"></div>
  </div>
  <h1 class="text-[40px] font-bold">Заголовок</h1>
</div>
```

### Преобразованный код (Twig + Tailwind):

```twig
<div class="container">
  <div class="flex flex-wrap gap-6 md:gap-8">
    <div class="bg-primary h-auto w-full sm:h-[100px] sm:w-[200px]"></div>
    <div class="bg-primary-dark h-auto w-full sm:h-[100px] sm:w-[200px]"></div>
  </div>
  <h1 class="text-h1 text-title">Заголовок</h1>
</div>
```

---

## 8. Скрипты для автоматизации

### Создание нового блока

```bash
npm run block
```

Создаст шаблон компонента в `src/components/` и стили в `src/styles/components/`.

### Создание новой страницы

```bash
npm run page
```

Создаст шаблон страницы в `src/pages/`.

---

## 9. Проверка перед коммитом

1. **Контейнеры** – нет ли `w-[1360px]` вместо `container`.
2. **Адаптив** – фиксированные размеры заменены на responsive-классы.
3. **Цвета** – HEX заменены на токены (`primary`, `success` и т.д.).
4. **Типографика** – размеры шрифтов используют `text-h1`, `text-base` и т.п.
5. **Изображения** – пути начинаются с `/images/`.
6. **Twig** – компоненты подключены через `{% include %}` или `{% import %}`.

---

## 10. Полезные ссылки

- `src/styles/base/theme.css` – тема Tailwind
- `src/styles/utils/utility.css` – кастомные утилиты
- `src/layouts/main.twig` – основной layout

---
