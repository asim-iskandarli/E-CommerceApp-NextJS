import { useRouter } from 'next/navigation';
import React from 'react';
import styled from 'styled-components';

const Logo = () => {
    const router = useRouter();

    return (
        <StyledLogo onClick={() => router.push('/')}>
            E-commerce
        </StyledLogo>
    )
}

export default Logo;

const StyledLogo = styled.div`
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
`;
