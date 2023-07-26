import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const user = ref('John');

  function setUser(value: string) {
    user.value = value;
  }
  return { user, setUser }
})