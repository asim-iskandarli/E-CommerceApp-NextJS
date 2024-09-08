import React from 'react';
import ProductCard from './ProductCard';
import { Container, StyledProducts, Title } from '.';
import { useProduct } from '@/app/contexts/productContext';
import axios from 'axios';
import { useAuth } from '@/app/contexts/authContext';

const PopularProducts = () => {
    const { popularProducts } = useProduct();

    return (
        <Container>
            <Title>Populyar məhsullar</Title>
            <StyledProducts>
                {
                    popularProducts?.map(({product}) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </StyledProducts>
        </Container>
    )
}

export default PopularProducts
