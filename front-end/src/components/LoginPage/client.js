export const loginUser = async (credentials) => {
        return fetch(`http://localhost:4001/login`, {
            method: 'POST',
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(credentials)
        }).then(data => data.json());
}