const COOKIE_USERNAMES = 'usernames';

export const useUsernameStore = defineStore('username', () => {
  const usernames: Ref<string[]> = useCookie(COOKIE_USERNAMES, { default: ()=>[], watch: 'shallow' });

  function addUsername(value: string) {
    if (usernames.value && usernames.value !== null) {
      usernames.value = [ ...usernames.value, value ];
    }
  }

  function removeUsername(index: number) {
    if (usernames.value && usernames.value !== null) {
      const _usernames = [ ...usernames.value ];
      _usernames.splice(index, 1);
      usernames.value = [ ..._usernames ];
    }
  }

  return { usernames, addUsername, removeUsername };
});