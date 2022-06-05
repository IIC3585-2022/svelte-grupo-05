<script>
    import { onMount } from 'svelte';
    import AnimeInfo from './../components/AnimeInfo.svelte';
    import AnimeComments from './../components/AnimeComments.svelte';
    import Navbar from './../components/Navbar.svelte';

    let loadingAnimeData = true
    let animeData = ''

    onMount( async() => {
        await fetch(`https://api.jikan.moe/v4/anime/${location.href.split("=")[1]}`)
            .then(res => res.json())
            .then(data => {
                animeData = data || ''
                loadingAnimeData = false
            });
    });
</script>

<main>
    <Navbar />
    {#if animeData}
        <AnimeInfo 
            title = {animeData.data.title} 
            poster = {animeData.data.images.jpg.image_url}
            mal_id = {animeData.data.mal_id}
            synopsis = {animeData.data.synopsis}
        />
    {/if}
    <AnimeComments />
</main>

<style>
</style>
