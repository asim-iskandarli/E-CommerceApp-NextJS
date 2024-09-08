"use client"
import React from 'react'
import { useAuth } from '@/app/contexts/authContext';
import { StyledButton, StyledIcon } from '@/app/globalStyles'
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import UserDropdown from './UserDropdown';
import { MoonLoader } from 'react-spinners'

const Menu = () => {
  const router = useRouter();
  const { user, loading } = useAuth();

  return (
    <Container>
      <StyledIcon onClick={() => router.push('/favorites')}><FaRegHeart /></StyledIcon>
      <StyledIcon onClick={() => router.push('/cart')}><LuShoppingCart /></StyledIcon>
      {
        loading ?
          <MoonLoader color="#55c2da" size={16}/>
          :
          user ?
            <UserDropdown />
            :
            <UserButton onClick={() => router.push('/auth/signin')}>Daxil ol</UserButton>
      }
    </Container>
  )
}

export default Menu

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
`;

const UserButton = styled(StyledButton)`
  width: 100px;
`;
