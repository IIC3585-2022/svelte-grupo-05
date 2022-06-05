<script>
    import { push } from 'svelte-spa-router';
    export let comments
    
    const handleSubmit = async (event) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        await fetch("https://vue-grupo5-backend.herokuapp.com/api/review", {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                "animeId": parseInt(location.href.split("=")[1]),
                "email": "user@uc.cl",
                "text": event.target.elements.review.value
            }),
            redirect: 'follow'
        }).then(res => {
            if (res.status == 400) {
                alert("Ya escribiste una review en este anime.")
            }
            return res.json();
        }).then(data => {
            console.log(data);
            console.log("hay que actualizar los comentarios")
        }).finally(
          event.target.elements.review.value = '',
        ).catch(err => console.log("ERR: ", err))
    }
</script>

<article>
    <div class="comments">
        <h3>Reviews</h3>
        { #if comments }
            { #each comments as { key, text } }
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
    .box-comment {
        padding-bottom: 10px;
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
