import styled from "styled-components";
import CartItem from "./cartItem";
import { CartItemType } from "@/pages";

import React from 'react'

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {

    const calculateTotal = (items: CartItemType[]) =>
        items.reduce((ack: number, item) => ack + item.amount * item.price, 0)

  return (
    <Wrapper>
        <h2>Your Shopping Cart</h2> 
        {cartItems.length == 0 ? <p>No items in cart</p> : null}
        {cartItems.map(item => (
            <CartItem 
                key={item.id} 
                item={item}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
            />
        ))}
        <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    font-family: Arial, Helvetica, sans-serif;
    width: 500px;
    padding: 20px;
`;

export default Cart