import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { Container, StyledProducts, Title } from '.';
import axios from 'axios';
import { useProduct } from '@/app/contexts/productContext';

const AllProducts = () => {
    const {allProducts} = useProduct();

    return (
        <Container>
            <Title>Bütün məhsullar</Title>
            <StyledProducts>
                {
                    allProducts?.map((product: any) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </StyledProducts>
        </Container>
    )
}

export default AllProducts


