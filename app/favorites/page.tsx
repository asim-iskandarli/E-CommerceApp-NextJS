"use client"
import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Price from '../components/product/Price'
import { RiDeleteBin6Line } from "react-icons/ri";
import { StyledIcon } from '../globalStyles'
import { useFavorite } from '../contexts/favoriteContext'
import CartButton from '../components/buttons/CartButton'

const Favorites = () => {
    const { favoriteProducts, removeFromFavorite } = useFavorite();

    return (
        <StyledFavorite>
            <Title>Bəyəndiklərim</Title>
            <Bottom>
                <Left>
                    {
                        favoriteProducts?.map((product) => (
                            <Product key={product.id}>
                                <ProductImage><Image src={product.image} fill alt='ProductImage' /></ProductImage>
                                <ProductBody>
                                    <BodyTop>
                                        <ProductName>{product.name}</ProductName>
                                        <StyledIcon onClick={() => removeFromFavorite(product.id)}><RiDeleteBin6Line size={22} /></StyledIcon>
                                    </BodyTop>
                                    <BodyBottom>
                                        <Price oldPrice={product.oldPrice} newPrice={product.newPrice} />
                                        <Button>
                                            <CartButton product={product} />
                                        </Button>
                                    </BodyBottom>
                                </ProductBody>
                            </Product>
                        ))
                    }
                </Left>
            </Bottom>
        </StyledFavorite>
    )
}

export default Favorites;

const StyledFavorite = styled.div`
    background-color: #fff;
    padding: 5px;
    display: flex;
    flex-direction: column;
    min-height: 40vh;
`;

const Title = styled.h3`
    padding: 1rem;
`;

const Bottom = styled.div`
    display: flex;
    gap: 1rem;
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
    width: 85%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const BodyBottom = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;
`;

const Button = styled.div`
    width: 200px;
`;
const ProductImage = styled.div`
    width: 150px;
    height: 150px;
    position: relative;
`;
const ProductName = styled.h3``;
