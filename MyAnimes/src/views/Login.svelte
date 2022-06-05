<script>
    import { push } from 'svelte-spa-router';
    import { get } from 'svelte/store';
    import { token, user } from '../store.js';

    let email = "";
    let password = "";

    const handleLogin = async (event) => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            email,
            password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch("https://vue-grupo5-backend.herokuapp.com/api/login", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.error) {return alert(`Error: ${result.error}`)}
                token.set(result.token);
                user.set(email);
                push("/");
            })
            .catch(error => console.log('error', error));
    }
</script>


<main>    
    <h3>Log In</h3>
    <form on:submit|preventDefault={() => handleLogin()}>
        <div class="container">
            <label for="uname"><b>Email</b></label>
            <input bind:value={email} type="text" placeholder="example@gmail.com" name="email" required>

            <label for="psw"><b>Password</b></label>
            <input bind:value={password} type="password" placeholder="Enter Password" name="psw" required>               
            
                <button type="submit" >
                    Log In                
                </button>
            
        </div>
    </form>    
    
</main>

<style scoped>
    div, h3 {
        float: center;
        text-align: center;
    }

    h3 {
    color: white;
    } 

    h3 {
        font-size: 5rem;
    }

    div {
        text-align: center;
        padding-top: 100px;
        min-height: 100%;
    }

    form {
        width: 420px;
        padding-top: 40px;
        display: block;
        margin-left: auto;
        margin-right: auto;
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
    }

    button:hover {
        opacity: 1;
    }

    input[type=text], input[type=password] {
        width: 100%;
        padding: 15px;
        margin: 5px 0 22px 0;
        display: inline-block;
        border: none;
        background: #f1f1f1;
        width: 400px;
    }
  
    input[type=text]:focus, input[type=password]:focus {
        background-color: #ddd;
        outline: none;
    }

    .container {
        padding: 16px;
        background-color: white;
        width: 420px;
        border-radius: 10px;
    }
</style>
