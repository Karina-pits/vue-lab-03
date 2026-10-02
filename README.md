# Лабораторна робота №3 — Vue 3: компоненти, шаблони, директиви

## Запуск

```bash
npm install
npm run dev        # dev-сервер
npm run lint       # ESLint
npm run type-check # перевірка TypeScript
```

## Структура

- `src/components/Users.vue` — список юзерів: toolbar, фільтри, сортування, скидання, порожній стан
- `src/components/UserCard.vue` — картка юзера за макетом (ліва колонка + блок «About me»): `v-if`, `v-for`, `:class` (об'єктний синтаксис), `v-show`
- `src/components/AppIcon.vue` — іконки (inline SVG)
- `src/data/users.json` — 10 юзерів у форматі `user.json` (+ `hobbies`, `details`); перший — Emma Lampi
- `src/types/user.ts`, `src/types/icon.ts` — TypeScript-типи
- `public/users/` — фото юзерів, `public/tutorial/` — скріншоти tutorial (`step-1.png`, …)

## Відповіді на контрольні питання

1. **Компонент** — самодостатній блок UI зі своїм шаблоном, логікою та стилями. Застосунок складається з дерева компонентів; вони дають повторне використання й розділення відповідальності.
2. **SFC** — файл `.vue`, що поєднує в одному місці `<template>` (розмітка), `<script>` / `<script setup>` (логіка) і `<style>` (стилі, можна `scoped`).
3. **Шаблон** — декларативний HTML-подібний опис UI. У ньому можна використовувати інтерполяцію `{{ }}`, директиви (`v-if`, `v-for`, `v-bind`, `v-on`, `v-model`…), JS-вирази, виклики методів і дочірні компоненти.
4. **HTML vs шаблон Vue** — шаблон Vue компілюється у render-функцію і реактивно оновлює DOM; підтримує інтерполяцію, директиви та компоненти. Звичайний HTML статичний.
5. **Директиви** — спеціальні атрибути з префіксом `v-`, що додають до елемента реактивну поведінку. Синтаксис: `v-name:argument.modifier="expression"`. Скорочення: `:` = `v-bind:`, `@` = `v-on:`.
6. **`v-bind`** — динамічно прив'язує атрибут чи проп до виразу. Приклад: `<img :src="user.picture" :alt="user.name.first">`.
7. **`v-bind:src` vs `:src`** — різниці немає, `:` — скорочений запис.
8. **`v-if`** — умовно рендерить елемент: при `false` елемент видаляється з DOM (і створюється заново при `true`). `v-else-if` — додаткова гілка умови, `v-else` — гілка «інакше»; вони мають стояти одразу після `v-if`/`v-else-if`. **`v-if` vs `v-show`**: `v-show` завжди рендерить елемент і лише перемикає CSS `display: none`. `v-if` дорожчий при перемиканні, але дешевший на старті; `v-show` — навпаки.
9. **`v-for`** — рендерить список за масивом/об'єктом/діапазоном: `v-for="item in items"`. `:key` має бути унікальним і стабільним (id, email), не індекс; він дозволяє Vue коректно перевикористовувати й переупорядковувати елементи. Не комбінуйте `v-for` і `v-if` на одному елементі — використовуйте computed.
10. **Реактивність** — механізм, за яким Vue відстежує використання реактивних даних (`ref`, `reactive`) і автоматично оновлює лише ті частини DOM, що від них залежать, коли значення змінюється.

## План комітів (Conventional Commits)

```
chore: scaffold vue 3 project with typescript and eslint
docs: add tutorial screenshots
feat: add user types and users.json data
feat: add UserCard component
feat: use v-if, v-for, :class and v-show in UserCard
feat: add Users list with photos and empty state
feat: add gender and age filters
feat: add sorting that works together with filters
feat: add reset button
docs: add answers to control questions
```
"# vue-lab-03" 
