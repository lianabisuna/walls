export const useAuthenticationStore = defineStore('authentication', () => {
  const user = ref('John');

  function setUser(value: string) {
    user.value = value;
  }
  return { user, setUser }
});