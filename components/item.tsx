/* eslint-disable @next/next/no-img-element */
// eslint-disable-next-line @next/next/no-img-element
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
//types
import { CartItemType } from '@/pages'

type Props = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
}

const Item: React.FC<Props> = ({ item, handleAddToCart }) => {

  return (
    <div>
        <Wrapper>
            <img src={item.image} alt={item.title} />
            <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <h3>{item.price}</h3>
            </div>
            <StyledButton onClick={() => handleAddToCart(item)}>Add to cart</StyledButton>
        </Wrapper>
    </div>
  )
}


const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    border: 1px solid lightblue;
    border-radius: 10px;
    height: 33rem;
    overflow-y: hidden;
    
    img {
        max-height: 250px;
        object-fit: cover;
        border-radius: 20px 20px 0 0;
    }
    
    div {
        font-family: Arial, Helvetica, sans-serif;
        padding: 1rem;
        height: 100%;
    }

`;

const StyledButton = styled(Button)`
    color: black;
    background-color: #ececec;
    
    :hover {
        background-color: black;
        color: white;
    }
`;

export default Item