<script>
    import { get } from 'svelte/store';
    import { onMount } from 'svelte';
    import { user } from '../store.js';

    $: animeCommentList = []
    let loadingAnimeComments = true

    const handleSubmit = async (event) => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "animeId": parseInt(location.href.split("=")[1]),
            "email": get(user),
            "text": event.target.elements.review.value
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch("https://vue-grupo5-backend.herokuapp.com/api/review", requestOptions)
        .then(res => {
            if (res.status == 400) { alert("Ya escribiste una review en este anime.") }
            return res.json();
        })
        .then(data => {
            animeCommentList.push(data)
            animeCommentList = animeCommentList
        })
        .finally(event.target.elements.review.value = '',)
        .catch(err => console.log("ERR: ", err))
    }

    onMount( async () => {
        await fetch(`https://vue-grupo5-backend.herokuapp.com/api/review/anime/${location.href.split("=")[1]}`, {
            method: 'GET',
            redirect: 'follow'
        })
        .then(response => response.json())
        .then(data => {
            animeCommentList = data || []
            loadingAnimeComments = false
        })
    });
</script>

<article>
    <div class="comments">
        <h3>Reviews</h3>
        { #if animeCommentList }
            { #each animeCommentList as { key, text } }
                <div class="user-comment">
                    <div class="email">{ key.email }: </div>
                    <div class="text">{ text }</div>
                </div>
            { /each }
        { /if }
        <div class="add-comment">
            <form class="new-comment-box" on:submit|preventDefault={handleSubmit}>
                <input 
                    type="text" 
                    class="text-field" 
                    placeholder="Add your review" 
                    required
                    ref="comment"
                    name="review"
                />
            </form>
        </div>
    </div>
</article>

<style scoped>
    h3 {
        color: white;
        font-size: 2.5rem;
        letter-spacing: 2px;
        padding-bottom: 15px;
    }
    .comments { 
        display: flex;
        flex-direction: column;
        padding-left: 50px;
        width: 90%;
    }
    .user-comment { 
        display: flex;
        flex-direction: column;
        padding: 10px;
        background-color: #3f3f3f;
        color: white;
        border-radius: 10px;
    }
    .email {
        font-size: 17px;
        font-weight: bold;
    }
    .text {
        padding-left: 30px;
        padding-top: 8px;
    }
    input {
        font-size: 1rem;
        display: block;
        padding: 10px;
        width: 100%;
        opacity: 1;
        border-radius: 10px;
        height: 30px;
    }
    .add-comment {
        display: flex;
        flex-direction: column;
        padding-bottom: 40px;
    }
</style>
