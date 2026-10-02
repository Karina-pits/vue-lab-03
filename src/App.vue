//Головний файл сайту з глобальними стилями.
<script setup lang="ts">
import Users from '@/components/Users.vue'
</script>

<template>
  <main class="app">                                                       //Створює головний контейнер сторінки
    <h1 class="app__title">
      Користувачі
    </h1>
    <Users />
  </main>
</template>

<style>
:root {
  --color-bg: #f3f5f2;
  --color-text: #1e2a26;
  --color-muted: #5f6f68;
  --color-accent: #1f6f5c;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.5;
}

.app {
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 16px 64px;
}

.app__title {
  margin: 0 0 24px;
  font-size: 2rem;
}
</style>
