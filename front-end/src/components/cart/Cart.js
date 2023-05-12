import { Navbar } from "../HomePage/Navbar/Navbar"
import { useEffect, useState } from "react";
import { deleteCartItem, getCartItems, getOrder } from "./cartClient.js";
import { Button} from '@mui/material';

export const Cart = () => {

    const userId = localStorage.getItem('currentUser');
    useEffect(()=>{
        const fetchCartItems = async () => {
            try {
                const order = await getOrder(userId);
                const orderedProducts = await getCartItems(order.id);
                setProductList(orderedProducts);
            } catch (error) {
              console.error(error);
            }
          };
          fetchCartItems();
    }, [])
    const [productList, setProductList] = useState([]);

    const handleButtonClick = async (event) => {
        event.preventDefault();
        const {value} = event.target.dataset;
        const order = await getOrder(userId);
        console.log(order.id);

        const remove = await deleteCartItem(order.id, value);
        console.log(remove);
    }

    return(
        <div className='container'>
            <Navbar/>
            <div className='card-container'>
                {productList.map((product) => (
                    <div className='card' key={product.id}>
                        <h2 className='card-name'>{product.name}</h2>
                        <p className='card-description'>{product.description}</p>
                        <p className='card-price'>{product.price}$</p>
                        <Button color='error' data-value={product.id} variant="contained" onClick={handleButtonClick}>Remove</Button>
                    </div>
                ))}
            </div>
            <div className="price">
                <h1>Total price: </h1>
            </div>
        </div>
    )
}//