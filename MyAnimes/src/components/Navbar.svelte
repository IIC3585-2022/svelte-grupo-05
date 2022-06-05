<script>
    import { link } from 'svelte-spa-router';
    import { get} from 'svelte/store';
    import { token, navbarMessage } from '../store.js';
    
    const handleLogOut = () => {
        token.set('');
    };
</script>

<ul>
    <li><a href="/#/allanimes" class="logo">Home</a></li>
    
    {#if !get(token)}
        <li><a href="/register" use:link>Register</a></li>
        <li><a href="/login" use:link>Login</a></li>
    {:else}
        <li class="my-animes"><a href="/#/myAnimes">My Animes</a></li>
    {/if}
    {$navbarMessage}
    <li class="log-user" on:click={ handleLogOut }><a href="/" class="about">Log Out</a></li>
</ul>

<style>
	ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #333;
    }
    
    li {
        float: left;
    }
    li a {
        display: block;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
    }
    li a:hover:not(.active) {
        background-color: #111;
    }
    
    .log-user {
        float: right;
    }
	
</style>