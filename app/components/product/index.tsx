import React, { Suspense } from 'react'
import AllProducts from './AllProducts'
import styled from 'styled-components';
import PopularProducts from './PopularProducts';

const Products = () => {
  return (
    <Suspense>
        <PopularProducts />
        <AllProducts />
    </Suspense>
  )
}

export default Products

export const Title = styled.h3`
    padding: 5px;
    margin-bottom: 6px;
    color: #3a3a3a;
`;

export const Container = styled.div`
    margin-top: 2rem;
`;
export const StyledProducts = styled.div`
    display: flex;
    gap: 6px;
    overflow-x: auto;
`;
