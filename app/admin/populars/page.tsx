"use client"
import Price from '@/app/components/product/Price';
import { useProduct } from '@/app/contexts/productContext';
import Image from 'next/image';
import styled from 'styled-components';
import { StyledIcon } from '@/app/globalStyles';
import { IoPersonOutline } from "react-icons/io5";
import PopularProductDropdown from '@/app/components/admin/PopularProductDropdown';
import { useRouter } from 'next/navigation';
import { Creator, Footer, Header, NoProduct, ProductImage, ProductName, StyledProduct } from '../products/page';

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