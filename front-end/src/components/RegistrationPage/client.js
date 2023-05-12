export const createUser = async (credentials) => {
    return fetch(`http://localhost:4001/user`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(credentials)
    }).then(data => data.json());
    
}
export const createOrder = async (user)=> {
    const response = await fetch(`http://localhost:4001/create-order/${user}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        }
    });
    console.log(response.json());
    if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}
