"use client"
import CreateProduct from '@/app/components/admin/CreateProduct';
import Price from '@/app/components/product/Price';
import { useProduct } from '@/app/contexts/productContext';
import Image from 'next/image';
import styled from 'styled-components';
import { StyledIcon } from '@/app/globalStyles';
import ProductDropdown from '@/app/components/admin/ProductDropdown';
import { IoPersonOutline } from "react-icons/io5";
import { useRouter } from 'next/navigation';

const Products = () => {
  const { allProducts } = useProduct();
  const router = useRouter();

  return (
    <Container>
      <CreateProduct />
      <AllProducts>
        {
          allProducts.length > 0 ?
            allProducts.map(product => (
              <StyledProduct key={product.id}>
                <Header>
                  <StyledIcon>
                    <ProductDropdown product={product} />
                  </StyledIcon>
                </Header>
                <ProductName onClick={() => router.push(`/product/${product?.id}`)}>
                  {product.name}
                </ProductName>
                <ProductImage onClick={() => router.push(`/product/${product?.id}`)}>
                  <Image src={product.image} fill alt="Product" sizes='100%' />
                </ProductImage>
                <Footer>
                  <Price oldPrice={product.oldPrice} newPrice={product.newPrice} />
                  <Creator><IoPersonOutline /> {product.User?.name}</Creator>
                </Footer>
              </StyledProduct>
            )) :
            <NoProduct>Hələ heçbir məhsul yoxdur</NoProduct>
        }
      </AllProducts>
    </Container>
  )
}

export default Products

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
`;

const AllProducts = styled.div`
   width: 100%;
   display: flex;
   flex-wrap: wrap;
   gap: 10px;
`;


export const StyledProduct = styled.div`
  width: 300px;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 8px;


  @media only screen and (max-width: 768px) {
    width: 250px !important;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;


export const ProductName = styled.h4`
  margin-bottom: 5px;
  text-align: center;
  color: var(--label-color);
  cursor: pointer;
`;


export const ProductImage = styled.div`
  position: relative;
  width: 220px;
  height: 220px;
  margin: 0 auto;
  cursor: pointer;

  img {
    border-radius: 7px;
  }
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;


export const NoProduct = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 2rem;
  font-size: 22px;
  color: #bbbbbbb9;
  font-weight: 600;
`;

export const Creator = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 5px;
`;