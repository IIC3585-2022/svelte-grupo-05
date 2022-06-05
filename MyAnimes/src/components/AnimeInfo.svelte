<script>
    import { get } from 'svelte/store';
    import { token } from '../store.js';

    export let title,poster,mal_id,synopsis

    const addToList = async() => {

        var myHeaders = new Headers();

        myHeaders.append("Authorization", "Bearer " + get(token));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "animeId": mal_id });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        
        await fetch("https://vue-grupo5-backend.herokuapp.com/api/user/anime", requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    };
</script>

<article>
    <div class="container">
        <div class="card__title">{ title }</div>
        <div class="card__content">
            <div class="card__image card__image--fence">
                <img src={poster} alt={title}/>
                <div class="div-button"><button on:click={ addToList }> Add to My Animes</button></div>
            </div>
            <p class="card__text">{ synopsis }</p>
        </div>
    </div>
</article>

<style>
    img {
        width: 250px;
        vertical-align: middle;
    }
    p {
        display: block;/* or inline-block */
        text-overflow: ellipsis;
        word-wrap: break-word;
        overflow: hidden;
        color: white;
    }
    button {
        background-color: #03c04a;
        color: white;
        padding: 16px 20px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        width: 100%;
        opacity: 0.9;
        font-size: 15px;
        font-weight: bold;
    }
    button:hover {
        opacity: 1;
    }
    .div-button {
        padding-top: 10px;
    }
    .container {
        display: flex;
        flex-direction: column;
        padding: 50px;
        width: 90%;
    }
    .card__content {
        display: flex;
        flex: 1 1 auto;
        flex-direction: row;
        margin-left: auto;
        margin-right: auto;
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
        width: 250px;
    }
    .card__title {
        color: white;
        font-size: 3.9rem;
        letter-spacing: 2px;
        text-transform: uppercase;
        padding-bottom: 30px;
    }
    .card__text {
        flex: 1 1 auto;
        font-size: 18px;
        line-height: 1.5;
        margin-bottom: 1.25rem;
        max-width: 70%;
        padding-left: 50px;
    }
</style>