<script>
    import { push } from 'svelte-spa-router';
    export let title,poster,mal_id

    const handleClick = () => {
        push('/anime/id='+mal_id)
    }
</script>



<div class="card__item" on:click={ handleClick }>
    <div class="card">
        <div class="card__image card__image--fence">           
            <button >
                <img src={poster} alt={title}/>        
            </button>            
        </div>
        <h3>{title}</h3>
    </div>
</div>


<style>
    img {
        height: auto;
        width: 250px;
        height: 350px;
        vertical-align: middle;
    }

    .card__item {
        max-width: 350px;
        height: 450px;
        padding: 20px;
    }

    .card {
        background-color: white;
        border-radius: 0.25rem;
        box-shadow: 0 20px 40px -14px rgba(0,0,0,0.25);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        width: 250px;
        height: 450px;
        padding: 40px;
    }
    .card:hover {
        transform: scale(1.05);
    }

    .card__image {
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
        overflow: hidden;
        position: relative;
        transition: filter 0.5s cubic-bezier(.43,.41,.22,.91);
    }


</style>