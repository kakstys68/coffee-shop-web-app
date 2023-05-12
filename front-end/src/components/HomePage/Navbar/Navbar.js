import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'
export const Navbar = () => {
    const navigate = useNavigate();
    const handleCartClick = () => {
        navigate('/cart');
    }
    const handleHomeClick = () => {
        navigate('/home');
    }
    return(
<div className='navbar'>
                <div className='nav-home'>
                    <HomeIcon onClick={handleHomeClick} fontSize='large'/>
                </div>
                <div className='nav-account'>
                    <AccountCircleIcon fontSize='large'/>
                </div>
                <div className='nav-basket'>
                    <ShoppingCartIcon onClick={handleCartClick} fontSize='large'/>
                </div>
                <div className='nav-title'>
                    <h1 className='title'>Coffee House</h1>
                </div>
            </div>
    )
}