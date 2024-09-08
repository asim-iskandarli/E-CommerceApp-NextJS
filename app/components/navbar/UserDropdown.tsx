import { useAuth } from '@/app/contexts/authContext';
import { signOut } from 'next-auth/react';
import React, { useState } from 'react'
import styled from 'styled-components';
import { IoPersonOutline } from "react-icons/io5";
import { StyledIcon } from '@/app/globalStyles';
import { useRouter } from 'next/navigation';


const UserDropdown = () => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false)
  const { user, logout } = useAuth();
  const router = useRouter();

  const toggleMenu = () => {
    setMenuVisible((prev: boolean) => !prev)
  }

  const handleLogout = () => {
    signOut();
    logout();

    toggleMenu();
  }

  const handleClickButton = (url: string) => {
    router.push(url);
    toggleMenu();
  }


  return (
    <Container>
      <StyledIcon onClick={toggleMenu}><IoPersonOutline /></StyledIcon>

      {
        menuVisible &&
        <DropdownMenu>
          <ul>
            <li onClick={() => handleClickButton('/profile')}>Profil</li>
            {
              user.role === 'ADMIN' &&
              <li onClick={() => {handleClickButton('/admin')}}>Admin Panel</li>
            }
            <li onClick={handleLogout}>Çıxış</li>
          </ul>
        </DropdownMenu>
      }
    </Container>
  )
}

export default UserDropdown

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;  
`;

const DropdownMenu = styled.div`
  width: 200px;
  padding: 1rem;
  position: absolute;
  top: 45px;
  right: 0;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: var(--box-shadow);
  z-index: 99;

  ul {
    li {
      list-style: none;
      margin-top: 5px;
      padding: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        background-color: #f7f7f7;
      }
    }
  }
`;