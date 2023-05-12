export const getProducts = async () => {
    const response = await fetch(`http://localhost:4001/products`, {
        method: 'GET',
        headers: {
            "Content-Type":"application/json",
        }
    });
    if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
    } else{
        //console.log(response.json())
        return response.json();
    }
}
export const addProduct = async (product) => {
    return fetch(`http://localhost:4001/add-product`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(product)
    }).then(data => data.json());
    
}
export const getOrder = async (user) => {
    return fetch(`http://localhost:4001/order/${user}`, {
        method: 'GET',
        headers: {
            "Content-Type":"application/json",
        }
    }).then(data => data.json());;

}
