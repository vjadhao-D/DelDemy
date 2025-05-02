import React, {useContext} from 'react';
import App from '../../App';

import {useState} from 'react';
const CartContext = React.createContext();

export const CartContextProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([]); // Initialize with some items
  const [itemCount, setItemCount] = useState(0);
  const [headerShown, setHeaderShown] = useState(false);

  const updateCart = item => {
    // Check if the item is already in the cart
    const itemExists = cartItems.some(cartItem => cartItem.id === item.id);
    if (itemExists) {
      console.log('Items in cart:', cartItems);
      console.log('Item count:', cartItems.length);
      console.log('Item already exists in the cart');
    } else {
      const updatedCart = [...cartItems, item]; // Create a new array with the new item
      setCartItems(updatedCart); // Update the cart items state
      setItemCount(updatedCart.length); // Update the item count
      console.log('Items in cart:', updatedCart);
    }
  };

  const deleteItem = item => {
    const updatedCart = cartItems.filter(cartItem => cartItem.id !== item.id);
    setCartItems(updatedCart);
    setItemCount(updatedCart.length);
  };

  return (
    <CartContext.Provider
      children=<App />
      value={{
        updateCart,
        cartItems,
        itemCount,
        deleteItem,
        setHeaderShown,
        headerShown,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
