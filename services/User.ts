import { Factory } from './Factory';

export class User extends Factory {
  base = '';
  axios = () => useNuxtApp().$axios;
  // axios = useRuntimeConfig().public.$axios as AxiosStatic;

  constructor() {
    super('');
  }

  register(params?: any) {
    return this.axios().post('register', params);
  }
}

export default new User();