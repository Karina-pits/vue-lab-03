export type Gender = 'male' | 'female'
//задає структуру даних профілю користувача та налаштування
//  для фільтрації й сортування списку людей.
export interface User {
  id: number
  gender: Gender
  name: { title: string; first: string; last: string }
  location: {
    street: { number: number; name: string }
    city: string
    state: string
    country: string
    postcode: number
    timezone: { offset: string; description: string }
  }
  email: string
  dob: { date: string; age: number }
  phone: string
  cell: string
  picture: string
  hobbies: string[]
  details: string
}

export type GenderFilter = 'all' | Gender
export type AgeFilter = 'all' | 'adult'
export type SortKey = 'name' | 'age'
export type SortDirection = 'asc' | 'desc'
export interface SortState {
  key: SortKey
  direction: SortDirection
}
