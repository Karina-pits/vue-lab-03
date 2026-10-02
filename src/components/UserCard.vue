<script setup lang="ts">
import { computed, ref } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import type { IconName } from '@/types/icon'
import type { User } from '@/types/user'

const props = defineProps<{ user: User }>()

const hobbyIcons: Record<string, IconName> = {
  travel: 'plane',
  photography: 'camera',
  hiking: 'mountain',
  reading: 'book',
  cooking: 'utensils',
  music: 'music',
}

// Блок «About me» (з полем details) показується/ховається через v-show
const isAboutOpen = ref(true)

const age = computed(() => props.user.dob.age)//Автоматичне обчислення віку користувача на основі його дати народження.
const fullName = computed(            //Обчислення повного імені шляхом об'єднання звернення, імені та прізвища.
  () => `${props.user.name.title} ${props.user.name.first} ${props.user.name.last}`,
)
const genderLabel = computed(() => (props.user.gender === 'female' ? 'Female' : 'Male'))
const birthDate = computed(() =>  //Форматування дати народження у зручний для читання український формат
  new Date(props.user.dob.date).toLocaleDateString('uk-UA', { timeZone: 'UTC' }),
)
const location = computed(() => props.user.location)

function hobbyIcon(hobby: string): IconName { //Функція, яка приймає назву хобі та повертає назву іконки.
  return hobbyIcons[hobby.toLowerCase()] ?? 'star'                      //Переводить назву хобі у нижній регістр, шукає у словнику; якщо не знаходить — повертає іконку зірки за замовчуванням
}

function toggleAbout(): void {
  isAboutOpen.value = !isAboutOpen.value
}
</script>

<template>
  <article
    class="user-card"
    :class="{
      'user-card--minor': age < 18,
      'user-card--young': age >= 18 && age <= 30,
      'user-card--adult': age > 30 && age <= 50,
      'user-card--senior': age > 50,
    }"
  >
    <aside class="user-card__profile">
      <img
        class="user-card__photo"
        :src="user.picture"
        :alt="`Фото: ${user.name.first} ${user.name.last}`"
      >
      <h2 class="user-card__name">
        {{ user.name.title }}. {{ user.name.first }} {{ user.name.last }}
      </h2>

      <p class="user-card__meta">
        <span class="user-card__meta-item">
          <AppIcon :name="user.gender === 'female' ? 'female' : 'male'" />
          {{ genderLabel }}
        </span>
        <span
          v-if="age > 18" 
          class="user-card__meta-item user-card__meta-item--age"
        >
          <AppIcon name="calendar" />
          {{ age }} years
        </span>
      </p>

      <ul class="user-card__contacts">
        <li>
          <AppIcon name="map-pin" />
          {{ location.city }}, {{ location.state }}, {{ location.country }}
        </li>
        <li>
          <AppIcon name="mail" />
          {{ user.email }}
        </li>
        <li>
          <AppIcon name="phone" />
          {{ user.phone }}
        </li>
        <li>
          <AppIcon name="smartphone" />
          {{ user.cell }}
        </li>
      </ul>
    </aside>

    <div class="user-card__content">
      <button
        class="user-card__toggle"
        type="button"
        :aria-expanded="isAboutOpen"
        @click="toggleAbout"
      >
        <AppIcon
          name="user"
          :size="24"
        />
        <span class="user-card__toggle-title">About me</span>
        <AppIcon
          name="chevron-down"
          class="user-card__chevron"
          :class="{ 'user-card__chevron--open': isAboutOpen }"
        />
      </button>

      <div
        v-show="isAboutOpen"
        class="user-card__about"
      >
        <p class="user-card__details">
          {{ user.details }}
        </p>

        <section class="section">
          <h3 class="section__title">
            <AppIcon
              name="document"
              :size="24"
            /> Personal Information
          </h3>
          <dl class="section__list">
            <dt>Full name</dt>
            <dd>{{ fullName }}</dd>
            <dt>Gender</dt>
            <dd>{{ genderLabel }}</dd>
            <dt>Date of birth</dt>
            <dd>
              {{ birthDate }}
              <span v-if="age > 18">(age {{ age }})</span>
            </dd>
            <dt>Email</dt>
            <dd>{{ user.email }}</dd>
            <dt>Phone</dt>
            <dd>{{ user.phone }}</dd>
            <dt>Cell</dt>
            <dd>{{ user.cell }}</dd>
          </dl>
        </section>

        <section class="section">
          <h3 class="section__title">
            <AppIcon
              name="map-pin"
              :size="24"
            /> Location
          </h3>
          <dl class="section__list">
            <dt>Street</dt>
            <dd>{{ location.street.number }} {{ location.street.name }}</dd>
            <dt>City</dt>
            <dd>{{ location.city }}</dd>
            <dt>State</dt>
            <dd>{{ location.state }}</dd>
            <dt>Country</dt>
            <dd>{{ location.country }}</dd>
            <dt>Postcode</dt>
            <dd>{{ location.postcode }}</dd>
            <dt>Timezone</dt>
            <dd>{{ location.timezone.offset }} ({{ location.timezone.description }})</dd>
          </dl>
        </section>

        <section class="section">
          <h3 class="section__title">
            <AppIcon
              name="star"
              :size="24"
            /> Hobbies
          </h3>
          <ul class="hobbies">
            <li
              v-for="hobby in user.hobbies"
              :key="hobby"
              class="hobby"
              :class="`hobby--${hobby.toLowerCase()}`"
            >
              <AppIcon
                :name="hobbyIcon(hobby)"
                :size="18"
              />
              {{ hobby }}
            </li>
          </ul>
        </section>
      </div>
    </div>
  </article>
</template>

<style scoped>
.user-card {
  --card-edge: #cfd8d3;
  --ink: #1b2a52;
  --ink-soft: #46557f;
  display: grid;
  grid-template-columns: minmax(280px, 380px) 1fr;
  overflow: hidden;
  color: var(--ink);
  background: #fff;
  border: 1px solid #e3e8f0;
  border-left: 8px solid var(--card-edge);
  border-radius: 16px;
  box-shadow: 0 6px 24px rgb(27 42 82 / 0.07);
}

/* Забарвлення за віком (об'єктний :class) */
.user-card--minor { --card-edge: #e8a33d; }
.user-card--young { --card-edge: #2e9e6b; }
.user-card--adult { --card-edge: #3a72c4; }
.user-card--senior { --card-edge: #8250b0; }

.user-card__profile {
  padding: 28px;
  border-right: 1px solid #e3e8f0;
}

.user-card__photo {
  display: block;
  width: 100%;
  aspect-ratio: 368 / 318;
  object-fit: cover;
  border-radius: 14px;
}

.user-card__name {
  margin: 22px 0 14px;
  font-size: 1.9rem;
  line-height: 1.15;
}

.user-card__meta {
  display: flex;
  gap: 20px;
  margin: 0 0 20px;
  color: var(--ink-soft);
}
.user-card__meta-item {
  display: inline-flex;
  gap: 8px;
  align-items: center;
}
.user-card__meta-item--age {
  padding-left: 20px;
  border-left: 2px solid #c3cce0;
}

.user-card__contacts {
  display: grid;
  gap: 16px;
  margin: 0;
  padding: 0 0 24px;
  color: var(--ink-soft);
  list-style: none;
  border-bottom: 1px solid #e3e8f0;
}
.user-card__contacts li {
  display: flex;
  gap: 14px;
  align-items: center;
  overflow-wrap: anywhere;
}

.user-card__content {
  display: grid;
  align-content: start;
  gap: 16px;
  padding: 20px;
  background: #fcfdff;
}

.user-card__toggle {
  display: flex;
  gap: 14px;
  align-items: center;
  width: 100%;
  padding: 16px 20px;
  color: var(--ink);
  font: inherit;
  text-align: left;
  background: #f1f4fb;
  border: 1px solid #e3e8f0;
  border-radius: 14px;
  cursor: pointer;
}
.user-card__toggle:focus-visible {
  outline: 2px solid var(--ink);
  outline-offset: 2px;
}
.user-card__toggle-title {
  flex: 1;
  font-size: 1.25rem;
  font-weight: 700;
}
.user-card__chevron { transition: transform 0.2s; }
.user-card__chevron--open { transform: rotate(180deg); }

.user-card__about {
  display: grid;
  gap: 20px;
  padding: 20px;
  border: 1px solid #e3e8f0;
  border-radius: 14px;
}

.user-card__details {
  margin: 0;
  color: var(--ink-soft);
}

.section + .section {
  padding-top: 20px;
  border-top: 1px solid #e3e8f0;
}
.section__title {
  display: flex;
  gap: 14px;
  align-items: center;
  margin: 0 0 14px;
  font-size: 1.25rem;
}
.section__list {
  display: grid;
  grid-template-columns: minmax(110px, 200px) 1fr;
  gap: 10px 16px;
  margin: 0;
}
.section__list dt { color: var(--ink-soft); }
.section__list dd { margin: 0; overflow-wrap: anywhere; }

.hobbies {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hobby {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  padding: 6px 16px;
  font-size: 0.9rem;
  background: #eef2fb;
  border-radius: 999px;
}
.hobby--travel { color: #1d5fc4; background: #e4effd; }
.hobby--photography { color: #5b2fb5; background: #eee6fb; }
.hobby--hiking { color: #1f7a45; background: #e2f4e8; }
.hobby--reading { color: #8a5a00; background: #fdf0d8; }
.hobby--cooking { color: #a42450; background: #fbe4ec; }
.hobby--music { color: #1d5fc4; background: #e4effd; }

@media (max-width: 760px) {
  .user-card { grid-template-columns: 1fr; }
  .user-card__profile { border-right: 0; border-bottom: 1px solid #e3e8f0; }
  .section__list { grid-template-columns: 1fr; gap: 2px; }
  .section__list dd { margin-bottom: 8px; }
}
</style>
