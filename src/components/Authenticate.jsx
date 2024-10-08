import { useState } from "react"

const Authenticate = ({token}) => {

    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    async function authenticateToken() {
        try {

            if(!token){
                throw new Error(`Token is empty`);
            }
            
            const response = await fetch('https://fsa-jwt-practice.herokuapp.com/authenticate', 
                { 
                  method: "GET", 
                  headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                  }
                })
            
            const results = await response.json()            
            setSuccessMessage(results.message)
            
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <>
            <h2>Authenticate</h2>
            {error && <p className="errorMessage">{`There was an error during authentication: ${error}`}</p>}
            {successMessage && <p className="successMessage">{successMessage}</p>}
            <button onClick={authenticateToken}>Authenticate Token</button>
        </>
     );
}
 
export default Authenticate;