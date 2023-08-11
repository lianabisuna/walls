import { TailwindColor } from "components/app/types";

export const useAuthenticationStore = defineStore('authentication', () => {
  const user: Ref<UserLoginData> = useCookie('user');

  function setUser(value: UserLoginData) {
    user.value = value;
  }
  return { user, setUser }
});

export interface UserLoginData {
  token: string;
  user: UserData;
}

export interface UserData {
  created_at: string;
  email: string;
  email_verified_at: string;
  first_name: string;
  id: number;
  last_name: string;
  updated_at: string;
  is_active?: number;
  is_admin?: number;
  color?: TailwindColor;
  username?: string;
}