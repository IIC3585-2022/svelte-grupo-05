<script>
    import { onMount } from 'svelte';
    import AnimeInfo from './../components/AnimeInfo.svelte';
    import AnimeComments from './../components/AnimeComments.svelte';

    let value = ''
    let loadingAnimeData = true
    let loadingAnimeComments = true
    let text = ''
    let animeData = ''
    let animeCommentList = []

    onMount( async() => {
        await fetch(`https://api.jikan.moe/v4/anime/${location.href.split("=")[1]}`)
            .then(res => res.json())
            .then(data => {
                animeData = data || ''
                loadingAnimeData = false
            });

        await fetch(`https://vue-grupo5-backend.herokuapp.com/api/review/anime/${location.href.split("=")[1]}`, {
            method: 'GET',
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(data => {
                animeCommentList = data || []
                loadingAnimeComments = false
            })
    })

</script>

<main>
    {#if animeData}
        <AnimeInfo 
            title = {animeData.data.title} 
            poster = {animeData.data.images.jpg.image_url}
            mal_id = {animeData.data.mal_id}
            synopsis = {animeData.data.synopsis}
        />
    {/if}
    {#if animeCommentList}
        <AnimeComments 
            comments = {animeCommentList}
        />
    {/if}
</main>

<style>
</style>
