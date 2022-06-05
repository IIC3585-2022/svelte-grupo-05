<script>
    import { push } from 'svelte-spa-router';
    export let animeId
    const handleSubmit = async (event) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        await fetch("https://vue-grupo5-backend.herokuapp.com/api/review", {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                "animeId": parseInt(animeId),
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
</article>

<style>
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
