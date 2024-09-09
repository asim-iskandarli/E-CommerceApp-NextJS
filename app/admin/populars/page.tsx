"use client"
import Price from '@/app/components/product/Price';
import { useProduct } from '@/app/contexts/productContext';
import Image from 'next/image';
import styled from 'styled-components';
import { StyledIcon } from '@/app/globalStyles';
import { IoPersonOutline } from "react-icons/io5";
import PopularProductDropdown from '@/app/components/admin/PopularProductDropdown';
import { useRouter } from 'next/navigation';

const PopularProducts = () => {
  const { popularProducts } = useProduct();
  const router = useRouter();

  return (
    <Container>
      <StyledProducts>
        {
          popularProducts.length > 0 ?
          popularProducts.map((data) => (
              <StyledProduct key={data.product.id}>
                <Header>
                  <StyledIcon>
                    <PopularProductDropdown popularProductId={data.id} />
                  </StyledIcon>
                </Header>
                <ProductName onClick={() => router.push(`/product/${data.product?.id}`)}>
                  {data.product.name}
                </ProductName>
                <ProductImage onClick={() => router.push(`/product/${data.product?.id}`)}>
                  <Image src={data.product.image} fill alt="Product" sizes="100%" />
                </ProductImage>
                <Footer>
                  <Price oldPrice={data.product.oldPrice} newPrice={data.product.newPrice} />
                  <Creator><IoPersonOutline /> {data.product.User?.name}</Creator>
                </Footer>
              </StyledProduct>
            )) :
            <NoProduct>Hələ heçbir populyar məhsul yoxdur</NoProduct>
        }
      </StyledProducts>
    </Container>
  )
}

export default PopularProducts

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
`;

const StyledProducts = styled.div`
   width: 100%;
   display: flex;
   flex-wrap: wrap;
   gap: 10px;
`;

const StyledProduct = styled.div`
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

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ProductImage = styled.div`
  position: relative;
  width: 220px;
  height: 220px;
  margin: 0 auto;
  cursor: pointer;

  img {
    border-radius: 7px;
  }
`;


const ProductName = styled.h4`
  margin-bottom: 5px;
  text-align: center;
  color: var(--label-color);
  cursor: pointer;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;


const NoProduct = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 2rem;
  font-size: 22px;
  color: #bbbbbbb9;
  font-weight: 600;
`;

const Creator = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 5px;
`;