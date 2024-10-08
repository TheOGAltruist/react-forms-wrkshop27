import { useState } from "react";

const SignUpForm = ({setToken}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    async function handleOnSubmit(event) {
        event.preventDefault();
        console.log(username,password);
        

        try {

            if(username === "" || password === ""){
                throw new Error(`Username or Password is empty`);
            }
            const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', 
                { 
                  method: "POST", 
                  headers: { 
                    "Content-Type": "application/json" 
                  }, 
                  body: JSON.stringify({ 
                    username: username, 
                    password: password
                  }) 
                })
            
            const results = await response.json();
            
            setToken(results.token)
            setSuccessMessage(results.message)
            resetForm();

        } catch (error) {
            setError(error.message)
        }
    }

    function resetForm() {
        setUsername("");
        setPassword("");
    }

    return ( 
        <>
        <h2>Sign Up here!</h2>
        {successMessage && <p className="successMessage">{`SignUp was successful! ${successMessage}`}</p>}
        {error && <p className="errorMessage">{error}</p>}
        <form method="post" onSubmit={handleOnSubmit}>
            <label>
                Username: {""}
                <input
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
                />
            </label><br />
            <label>
                Password: {""}
                <input
                type="password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                />
            </label><br /><br />
            <button>Submit</button>
        </form>
        </>
     );
}
 
export default SignUpForm;