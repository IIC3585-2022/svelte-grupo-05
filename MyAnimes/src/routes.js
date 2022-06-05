import Register from './views/Register.svelte';
import Login from './views/Login.svelte';
import MyAnimes from './views/MyAnimes.svelte';
import AnimeProfile from './views/AnimeProfile.svelte';
import HomePage from './views/HomePage.svelte';


export default {
  '/register': Register,
  '/login': Login,
  '/myAnimes': MyAnimes,
  '/': HomePage,
  '/anime/:id': AnimeProfile,
  '/allanimes': HomePage
}
