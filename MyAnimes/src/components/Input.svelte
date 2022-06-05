<script>
    import { onMount } from 'svelte';
    import Anime from './Anime.svelte'

    let value = ''
    let loading = true
    let text = ''
    let response = []



    const handleSubmit = async () => {
		 await fetch(`https://api.jikan.moe/v4/anime?q=${text}&sfw`)
        .then(res => res.json())
        .then(apiResponse => {
            console.log(apiResponse)
            response = apiResponse.data || []
            loading = false
        });  
    
  
    }

    onMount ( async () => {
        await fetch('https://api.jikan.moe/v4/top/anime')
            .then(res => res.json())
            .then(data => {
                response = data.data
                loading = false
            });
    })
</script>


<form on:submit|preventDefault={handleSubmit}>
    <input 
       
        placeholder="Search Anime..." 
        bind:value={text}
    />
</form>
<div class="grid">

{#if response}

{ #each response as { title,images, mal_id } }
    <Anime 
    title = {title}
    poster = {images.jpg.image_url}
    mal_id = {mal_id}
    />
{/each}

{/if}

</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		grid-gap: 0.8rem;
	}
	
</style>