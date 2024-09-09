"use client"
import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Price from '../components/product/Price'
import { RiDeleteBin6Line } from "react-icons/ri";
import { StyledButton, StyledIcon } from '../globalStyles'
import Counter from '../components/product/Counter'
import { useCart } from '../contexts/cartContext'

const Cart = () => {
    const { cartProducts, removeFromCart } = useCart();

    let totalOldPrices: number | undefined = cartProducts?.reduce((total, item) => total + item.quantity * item.oldPrice, 0);
    let TotalDiscount: number | undefined = cartProducts?.reduce((total, item) => total + (item.quantity * item.newPrice) - (item.quantity * item.oldPrice), 0);
    let totalPrice: number | undefined = cartProducts?.reduce((total, item) => total + item.quantity * item.newPrice, 0);

    return (
        <Container>
            <Title>Səbət</Title>
            <StyledCart>
                <Left>
                    {
                        cartProducts?.map((product) => (
                            <Product key={product.id}>
                                <ProductImage><Image src={product.image} fill alt='ProductImage' /></ProductImage>
                                <ProductBody>
                                    <BodyTop>
                                        <ProductName>{product.name}</ProductName>
                                        <StyledIcon onClick={() => removeFromCart(product.id)}><RiDeleteBin6Line size={22} /></StyledIcon>
                                    </BodyTop>
                                    <BodyBottom>
                                        <Counter cardProduct={product} />
                                        <Price oldPrice={product.oldPrice} newPrice={product.newPrice} />
                                    </BodyBottom>
                                </ProductBody>
                            </Product>
                        ))
                    }
                </Left>
                <Right>
                    <RightHeader><h3>Məhsul</h3></RightHeader>
                    <RightBody>
                        <TotalProductPrice>Məhsulların qiyməti {totalOldPrices?.toFixed(2)} AZN</TotalProductPrice>
                        <TotalProductPrice>Endirim {TotalDiscount?.toFixed(2)} AZN</TotalProductPrice>
                        <TotalProductPrice>Toplam qiymət {totalPrice?.toFixed(2)} AZN</TotalProductPrice>
                    </RightBody>
                    <RightFooter><StyledButton>Sifarişi Rəsimləşdir</StyledButton></RightFooter>
                </Right>
            </StyledCart>
        </Container>
    )
}

export default Cart;

const Container = styled.div`
    background-color: #fff;
    padding: 5px;
    display: flex;
    flex-direction: column;
    min-height: 40vh;
`;

const Title = styled.h3`
    padding: 1rem;
`;

const StyledCart = styled.div`
    display: flex;
    gap: 1rem;

    @media only screen and (max-width: 768px) {
        flex-direction: column;
    }
`;

const Left = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-top: 1px solid #ddd;
    padding: 1rem;
`;

const Product = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;
`;
const ProductBody = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
`;
const BodyTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const BodyBottom = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;
`;
const ProductImage = styled.div`
    width: 120px;
    height: 120px;
    position: relative;

    @media only screen and (max-width: 768px) {
        width: 100px;
        height: 100px;
    }
`;
const ProductName = styled.h3`
    @media only screen and (max-width: 768px) {
        font-size: 14px;
    }
`;

const Right = styled.div`
    flex: 1;
    padding: 1rem;
    
`;

const RightHeader = styled.div`
    h3 {
        color: #4d4c4c;

        @media only screen and (max-width: 768px) {
            font-size: 18px;
        }
    }
    margin-bottom: 1rem;
`;

const RightBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 7px;
    margin-bottom: 1rem;
`;

const TotalProductPrice = styled.p`
  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

const RightFooter = styled.div`

`;