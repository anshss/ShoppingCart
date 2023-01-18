import { useQuery } from 'react-query'
import { useState } from 'react'
import styles from '@/styles/Home.module.scss'
import styled from 'styled-components'
//mui
import Drawer from '@material-ui/core/Drawer'
import { LinearProgress } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import AddShoppingCart from '@material-ui/icons/AddShoppingCart'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
//components
import Item from '@/components/item'
import Cart from '@/components/cart'

export type CartItemType = {
    id: number;
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    amount: number;
}


const Home = () => {

    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([] as CartItemType[])

    const getProducts = async () : Promise<CartItemType[]> => 
        await (await fetch(`https://fakestoreapi.com/products`)).json();

    const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts)
    console.log(data)

    const getTotalItems = (items: CartItemType[]) => 
        items.reduce((ack: number, item) => ack + item.amount, 0);

    const handleAddToCart = (clickedItem: CartItemType) => {
        setCartItems(prev => {
            //Is the item already in cart?
            const isItemInCart = prev.find(item => item.id === clickedItem.id)

            if (isItemInCart) {
                return prev.map(item => (
                    item.id === clickedItem.id ? { ...item, amount: item.amount + 1} : item
                ))
            }

            //First time the item is added
            return [...prev, { ...clickedItem, amount: 1}]
        })
    };
    const handleRemoveFromCart = (id: number) => {
        setCartItems(prev => (
            prev.reduce((ack, item) => {
                if (item.id === id) {
                    //Last time the item is removed
                    if (item.amount === 1) return ack
                    return [...ack, {...item, amount: item.amount - 1}];
                    //Removing items
                } else {
                    return [...ack, item]
                }
            }, [] as CartItemType[])
        ))
    }; 

    if (isLoading) return <LinearProgress />
    if (error) return <div>Something went wrong</div>
    
    return (
        <Wrapper>
            <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)} >
                <Cart 
                    cartItems={cartItems} 
                    addToCart={handleAddToCart}
                    removeFromCart={handleRemoveFromCart}
                />
            </Drawer>
            <div className="navbar">
                <h1> Shopping Cart </h1>
                <StyledButton onClick={() => setCartOpen(true)} >
                    <Badge badgeContent={getTotalItems(cartItems)} color='error' >
                       <AddShoppingCart />
                  </Badge>
                </StyledButton>
            </div>
            <Grid container spacing={3}>
                {data?.map(item => (
                    <Grid item key={item.id} xs={12} sm={4}>
                        <Item item={item} handleAddToCart={handleAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </Wrapper>
  )
}


const Wrapper = styled.div`
    overflow-y: hidden;
    overflow-x: hidden;
    margin: 40px;
    margin-top: 120px;
    
    .navbar {
        position: fixed;
        display: flex;
        justify-content: space-between;
        gap: 98rem;
        height: 90px;
        align-items: center;
        margin-top: -120px;
        background-color: white;
        z-index: 100;
    }    
`;

const StyledButton = styled(IconButton)``;

export default Home