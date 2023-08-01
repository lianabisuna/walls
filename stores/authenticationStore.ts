export const useAuthenticationStore = defineStore('authentication', () => {
  const user: Ref<UserData> = useCookie('user');

  function setUser(value: UserData) {
    user.value = value;
  }
  return { user, setUser }
});

export interface UserData {
  token: string;
  user: {
    created_at: string;
    email: string;
    email_verified_at: string;
    first_name: string;
    id: number;
    last_name: string;
    updated_at: string;
  }
}