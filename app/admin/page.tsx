"use client"
import React from 'react';
import styled from 'styled-components';
import { useProduct } from '../contexts/productContext';

const Admin = () => {
  const { allProducts } = useProduct();

  return (
    <Container>
      <StyledCount>
        Məhsul sayı <strong>{allProducts.length}</strong>
      </StyledCount>
      <StyledCount>
        Sifarişlər <strong>0</strong>
      </StyledCount>
    </Container>
  )
}

export default Admin

const Container = styled.div`
  padding: 1rem;
  display: flex;
  gap: 2rem;
`;

const StyledCount = styled.p`
  margin-bottom: 5px;
  strong {
    color: var(--primary)
  }
`;
