<script>
    import { get } from 'svelte/store';
    import { onMount } from 'svelte';
    import { token, updateMyAnimes} from '../store.js';
    import Anime from '../components/Anime.svelte';
    import Navbar from '../components/Navbar.svelte';

    let isLoading = true;
    let myAnimes = [];

    onMount( async() => {
        let animeIds = [];

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${get(token)}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch("https://vue-grupo5-backend.herokuapp.com/api/user/anime", requestOptions)
            .then(response => response.json())
            .then(result => animeIds = result.animes)
            .catch(error => console.log('error', error));

        for(let i = 0; i < animeIds.length; i++){
            await fetch(`https://api.jikan.moe/v4/anime/${animeIds[i]}`)
            .then(res => res.json())
            .then(data => {
                if (data.data) 
                {
                    if (!myAnimes.includes(data.data)) myAnimes = [...myAnimes, data.data];
                }

            });
        }
        isLoading = false;
    })

</script>

<main>
    <Navbar></Navbar>
    {#if !isLoading}
        <div class="all-cards">
            { #each myAnimes as { title,images, mal_id } }
                <Anime
                title = {title}
                poster = {images.jpg.image_url}
                mal_id = {mal_id}
                />
            {/each}
        </div>
    {/if}
</main>

<style scoped>

    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: white;
    }

    .all-cards {
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        margin: 0;
        background-color: #333;
        justify-content: center;
        padding: .5rem;
    }

</style>
