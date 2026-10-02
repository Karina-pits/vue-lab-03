<script setup lang="ts">
import { computed, ref } from 'vue'                                  //Імпорт інструментів Vue: ref (для змінних стану) та computed (для динамічних даних, що перераховуються автоматично).
import UserCard from '@/components/UserCard.vue'
import usersData from '@/data/users.json'
import type { AgeFilter, GenderFilter, SortState, User } from '@/types/user'

const users = ref<User[]>(usersData as User[])

const genderFilter = ref<GenderFilter>('all')                    //фільтр статі
const ageFilter = ref<AgeFilter>('all')                              //фільтр віку
const sort = ref<SortState | null>(null)

const genderOptions: { value: GenderFilter; label: string }[] = [
  { value: 'all', label: 'Всі' },
  { value: 'male', label: 'Чоловіки' },
  { value: 'female', label: 'Жінки' },
]

const ageOptions: { value: AgeFilter; label: string }[] = [
  { value: 'all', label: 'Всі' },
  { value: 'adult', label: '18 +' },
]

const sortButtons: (SortState & { label: string })[] = [
  { key: 'name', direction: 'asc', label: 'Ім’я ↑' },            //Сортування за ім'ям за зростанням (А-Я).
  { key: 'name', direction: 'desc', label: 'Ім’я ↓' },            //Сортування за ім'ям за спаданням (Я-А).
  { key: 'age', direction: 'asc', label: 'Вік ↑' },
  { key: 'age', direction: 'desc', label: 'Вік ↓' },
]

// Спочатку фільтруємо, потім сортуємо копію — сортування не ламає фільтри
const visibleUsers = computed<User[]>(() => {
  const filtered = users.value.filter((user) => {
    const matchesGender =
      genderFilter.value === 'all' || user.gender === genderFilter.value          //Перевірка: чи підходить користувач за статтю
    const matchesAge = ageFilter.value === 'all' || user.dob.age >= 18            //Перевірка: чи підходить за віком
    return matchesGender && matchesAge                            //Користувач залишається у списку, якщо він підходить і за статтю, і за віком.
  })

  if (!sort.value) return filtered

  const { key, direction } = sort.value
  const factor = direction === 'asc' ? 1 : -1

  return [...filtered].sort((a, b) => {
    if (key === 'age') return (a.dob.age - b.dob.age) * factor
    const nameA = `${a.name.first} ${a.name.last}`
    const nameB = `${b.name.first} ${b.name.last}`
    return nameA.localeCompare(nameB, 'uk') * factor
  })
})

function isSortActive(button: SortState): boolean {
  return sort.value?.key === button.key && sort.value.direction === button.direction
}

function setSort(button: SortState): void {
  sort.value = { key: button.key, direction: button.direction }
}

function resetAll(): void {
  genderFilter.value = 'all'
  ageFilter.value = 'all'
  sort.value = null
}
</script>

<template>
  <section class="users">
    <div
      class="toolbar"
      role="toolbar"
      aria-label="Фільтри та сортування"
    >
      <div class="toolbar__group">
        <span class="toolbar__label">Стать</span>
        <button
          v-for="option in genderOptions"
          :key="option.value"
          type="button"
          class="toolbar__button"
          :class="{ 'toolbar__button--active': genderFilter === option.value }"
          @click="genderFilter = option.value"
        >
          {{ option.label }}
        </button>
      </div>

      <div class="toolbar__group">
        <span class="toolbar__label">Вік</span>
        <button
          v-for="option in ageOptions"
          :key="option.value"
          type="button"
          class="toolbar__button"
          :class="{ 'toolbar__button--active': ageFilter === option.value }"
          @click="ageFilter = option.value"
        >
          {{ option.label }}
        </button>
      </div>

      <div class="toolbar__group">
        <span class="toolbar__label">Сортування</span>
        <button
          v-for="button in sortButtons"
          :key="`${button.key}-${button.direction}`"
          type="button"
          class="toolbar__button"
          :class="{ 'toolbar__button--active': isSortActive(button) }"
          @click="setSort(button)"
        >
          {{ button.label }}
        </button>
      </div>

      <button
        type="button"
        class="toolbar__button toolbar__button--reset"
        @click="resetAll"
      >
        Очистити все
      </button>
    </div>

    <ul
      v-if="visibleUsers.length > 0"
      class="users__list"
    >
      <li
        v-for="user in visibleUsers"
        :key="user.id"
      >
        <UserCard :user="user" />
      </li>
    </ul>
    <p
      v-else
      class="users__empty"
    >
      Список юзерів пустий
    </p>
  </section>
</template>

<style scoped>
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
  align-items: center;
  margin-bottom: 24px;
  padding: 12px 16px;
  background: #fff;
  border: 1px solid #cfd8d3;
  border-radius: 10px;
}
.toolbar__group { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.toolbar__label { margin-right: 4px; color: var(--color-muted); font-size: 0.85rem; }

.toolbar__button {
  padding: 5px 12px;
  color: var(--color-text);
  font: inherit;
  font-size: 0.9rem;
  background: #fff;
  border: 1px solid #b5c2bb;
  border-radius: 6px;
  cursor: pointer;
}
.toolbar__button:hover { border-color: var(--color-accent); }
.toolbar__button:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
.toolbar__button--active { color: #fff; background: var(--color-accent); border-color: var(--color-accent); }
.toolbar__button--reset { margin-left: auto; }

.users__list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.users__empty { padding: 48px 0; color: var(--color-muted); text-align: center; }

</style>
