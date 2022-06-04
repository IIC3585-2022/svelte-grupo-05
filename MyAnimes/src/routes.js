import Register from './views/Register.svelte';
import Login from './views/Login.svelte';
import MyAnimes from './views/MyAnimes.svelte';
import MainPage from './views/MainPage.svelte';

export default {
  '/register': Register,
  '/login': Login,
  '/myAnimes': MyAnimes,
  '/': MainPage,
}
