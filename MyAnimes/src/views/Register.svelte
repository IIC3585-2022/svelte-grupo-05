<script>
    import { push } from 'svelte-spa-router';

    let email = '';
    let password = '';

    const handleSubmit = async () => {        
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

        fetch("https://vue-grupo5-backend.herokuapp.com/api/user/", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (!result.message) {
                alert("Tu cuenta ha sido creada exitosamente!"); 
                push('/login');
            }
            else {
                alert(`${result.message}`);
            }
        })
        .catch(error => alert(`Error: ${error}`));
    }
</script>

<main>
  <h1>Register</h1>
  <form on:submit|preventDefault={() => handleSubmit()}>
    <div class="container">
      <label for="email"><b>Email</b></label>
      <input bind:value={email} type="text" placeholder="example@email.com" name="email" required>
      
      <label for="password"><b>Password</b></label>
      <input bind:value={password} type="password" placeholder="Enter password" name="password" required>

      <button type="submit">Sign Up</button>
    </div>
  </form>
</main>

<style>
    div {
        float: center;
        text-align: center;
    }

    h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
	    font-weight: 100;
        text-align: center;
        float: center;
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
