import './HomePage.css'
import './card.css'

import { useEffect, useState } from 'react';
import { addProduct, getOrder, getProducts } from './client';
import { Button} from '@mui/material';
import { Navbar } from './Navbar/Navbar';


export const HomePage = () => {
    const userId = localStorage.getItem('currentUser');
    useEffect(()=>{
        const fetchProducts = async () => {
            try {
              const data = await getProducts();
              setProductList(data);
            } catch (error) {
              console.error(error);
            }
          };
          fetchProducts();
    }, [])
    const [productList, setProductList] = useState([]);
    
    

    const handleButtonClick = async (event) => {
        event.preventDefault();
        console.log(userId);
        const {value} = event.target.dataset;
        const order = await getOrder(userId);
        console.log(order.id);
        let values = {
            orderId: order.id,
            productId: value
        }
        const add = await addProduct(values);
        console.log(add);
    }
    
    return (
        <>
        <div className='container'>
            <Navbar/>
            <div>
                <h1 className='intro'>Welcome to Coffee House!</h1>
            </div>
            <div className='card-container'>
                {productList.map((product) => (
                    <div className='card' key={product.id}>
                        <h2 className='card-name'>{product.name}</h2>
                        <p className='card-description'>{product.description}</p>
                        <p className='card-price'>{product.price}$</p>
                        <Button color='success' data-value={product.id} variant="contained" onClick={handleButtonClick}>Add</Button>
                    </div>
                ))}
            </div>

        </div>
        </>
    );
};