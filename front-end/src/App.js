import { Routes, Route } from 'react-router-dom';
import './App.css';
import {LoginPage} from './components/LoginPage/LoginPage.js';
import { RegistrationPage } from './components/RegistrationPage/RegistrationPage';
import {HomePage} from './components/HomePage/HomePage';
import { Cart } from './components/cart/Cart';

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<LoginPage/>}/>
        <Route exact path="/sign-up" element={<RegistrationPage/>}/>
        <Route exact path="/home" element={<HomePage/>}/>
        <Route exact path="/cart" element={<Cart/>}/>
      </Routes>
    </>
    
  );
}

export default App;
