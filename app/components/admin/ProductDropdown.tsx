import React, { useState } from 'react'
import styled from 'styled-components';
import { StyledIcon } from '@/app/globalStyles';
import { HiOutlineDotsVertical } from "react-icons/hi";
import axios from 'axios';
import { useProduct } from '@/app/contexts/productContext';
import toast from 'react-hot-toast';
import EditProduct from './EditProduct';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import firebaseApp from '@/lib/firebase';
import { ProductProps } from '@/app/types';

interface ProductDropdownProps {
  product: ProductProps;
}

const ProductDropdown: React.FC<ProductDropdownProps> = ({ product }) => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false)
  const [editVisible, setEditVisible] = useState<boolean>(false)

  const { popularProducts, deleteProduct, addPapularProduct } = useProduct();

  const toggleMenu = () => {
    setMenuVisible((prev: boolean) => !prev)
  }

  const toggleEdit = () => {
    toggleMenu()
    setEditVisible((prev: boolean) => !prev)
  }

  const handleDeleteProduct = async () => {
    axios.delete(`/api/product/${product.id}`)
      .then(async () => {
        deleteProduct(product.id);

        const storage = getStorage(firebaseApp);
        const imageRef = ref(storage, product.image);
        await deleteObject(imageRef);

        toast.success('Məhsul müvəffəqiyyətlə silindi')
      }).catch(() => {
        toast.error('Bir xəta baş verdi')
      })

    toggleMenu();
  }


  const addPopularProduct = (productId: string) => {
    axios.post('/api/product/popular', { productId })
      .then(({ data }) => {
        addPapularProduct(data, product);
        toast.success('Məhsul populyarlar siyahısına əlavə olundu')
      })
      .catch(() => {
        toast.error('Bir xəta baş verdi')
      })
    toggleMenu()
  }

  return (
    <Container>
      <StyledIcon onClick={toggleMenu}> <HiOutlineDotsVertical /></StyledIcon>
      {
        menuVisible &&
        <DropdownMenu>
          <ul>
            <li onClick={toggleEdit}>Redaktə et</li>
            {
              popularProducts?.find(data => data.product.id !== product.id) &&
              <li onClick={() => addPopularProduct(product.id)}>Populyarlara əlavə et</li>
            }
            <li onClick={handleDeleteProduct}>Sil</li>
          </ul>
        </DropdownMenu>
      }
      {
        editVisible &&
        <EditProduct toggleEdit={toggleEdit} product={product} />
      }
    </Container>
  )
}

export default ProductDropdown

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