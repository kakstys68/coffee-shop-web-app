export const getCartItems = async (order) => {
    const response = await fetch(`http://localhost:4001/order-details/${order}`, {
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
export const getOrder = async (user) => {
    return fetch(`http://localhost:4001/order/${user}`, {
        method: 'GET',
        headers: {
            "Content-Type":"application/json",
        }
    }).then(data => data.json());;

}
export const deleteCartItem = async (order,product) => {
    const response = await fetch(`http://localhost:4001/cart-item/${product}/${order}`, {
        method: 'DELETE',
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
