<script>
    import { push } from 'svelte-spa-router';
    export let title,poster,mal_id

    const handleClick = () => {
        console.log("wn handleClick")
        push('/anime/id='+mal_id)
    }
</script>

<article>
    <button on:click={ handleClick }>
        <img src={poster} alt={title}/>
        <h3>{title}</h3>
    </button>
</article>