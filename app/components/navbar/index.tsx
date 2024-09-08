import React from 'react'
import styled from 'styled-components';
import Logo from './Logo';
import Search from './Search';
import Menu from './Menu';

const Navbar = () => {
    return (
        <StyledNavbar>
            <Container>
                <Left>
                    <Logo />
                    <Search />
                </Left>
                <Menu />
            </Container>
        </StyledNavbar>
    )
}

export default Navbar

const StyledNavbar = styled.div`
    background-color: #fff;
    margin-bottom: 5px;
`;

const Container = styled.div`
    width: var(--container-width);
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
`;

const Left = styled.div`
    display: flex;
    gap: 2rem;
`;
