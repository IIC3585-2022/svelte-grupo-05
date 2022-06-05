<script>
	import {link} from 'svelte-spa-router'
</script>

<main>
  <h1>Welcome to MyAnimes!</h1>
  <ul>
    <li><a href="/register" use:link>Register</a></li>
	<li><a href="/login" use:link>Login</a></li>
	<li><a href="/myAnimes" use:link>myAnimes</a></li>
  </ul>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		font-size: 4em;
		font-weight: 100;
		padding-bottom: 100px;
	}
	a {
		color: white;
		font-size: 30px;
	}

	li {
		padding-bottom: 20px;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
