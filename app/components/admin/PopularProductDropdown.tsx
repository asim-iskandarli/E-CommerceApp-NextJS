import React, { useState } from 'react'
import styled from 'styled-components';
import { StyledIcon } from '@/app/globalStyles';
import { useRouter } from 'next/navigation';
import { HiOutlineDotsVertical } from "react-icons/hi";
import axios from 'axios';
import { useProduct } from '@/app/contexts/productContext';
import toast from 'react-hot-toast';

const PopularProductDropdown = ({ popularProductId }: { popularProductId: string }) => {
    const [menuVisible, setMenuVisible] = useState<boolean>(false)
    const {deletePopularProduct} = useProduct();
    
    const router = useRouter();

    const toggleMenu = () => {
        setMenuVisible((prev: boolean) => !prev)
    }

    const handleDeleteProduct = async () => {
        axios.delete(`/api/product/popular/${popularProductId}`)
            .then(() => {
                deletePopularProduct(popularProductId)
                toast.success('Məhsul populyarlar siyahısından silindi')
            }).catch(() => {
                toast.error('Bir xəta baş verdi')
            })

        toggleMenu();
    }

    return (
        <Container>
            <StyledIcon onClick={toggleMenu}> <HiOutlineDotsVertical /></StyledIcon>

            {
                menuVisible &&
                <DropdownMenu>
                    <ul>
                        <li onClick={handleDeleteProduct}>Sil</li>
                    </ul>
                </DropdownMenu>
            }
        </Container>
    )
}

export default PopularProductDropdown

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