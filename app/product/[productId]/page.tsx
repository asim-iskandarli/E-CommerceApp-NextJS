"use client"
import CartButton from '@/app/components/buttons/CartButton';
import Price from '@/app/components/product/Price';
import { useProduct } from '@/app/contexts/productContext';
import { ProductProps } from '@/app/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

type DetailProps = {
  params: {
    productId: string;
  }
}

const ProductDetail: React.FC<DetailProps> = ({ params }) => {
  const { productId } = params;

  const { allProducts } = useProduct()
  const [product, setProduct] = useState<ProductProps | null>()

  useEffect(() => {
    if (productId) {
      const productDetail: any = allProducts.find((product) => product.id === productId);
      setProduct(productDetail);
    }

  }, [productId, allProducts])

  if (!product) return;

  return (
    <Container>
      <Left>
        <ProductInfo>
          <ProductName>{product.name}</ProductName>
          <ProductImage>
            <Image src={product.image} fill alt='Product' />
          </ProductImage>
        </ProductInfo>
      </Left>
      <Right>
        <InStock $inStock={product.inStock}>Məhsul {product.inStock ? 'mövcuddur' : 'mövcud deyil'}</InStock>
        <Price oldPrice={product.oldPrice} newPrice={product.newPrice} />
        <Buttons>
          <CartButton product={product} />
        </Buttons>
      </Right>
    </Container>
  )
}

export default ProductDetail


const Container = styled.div`
  width: 85%;
  margin: 0 auto;
  min-height: 80vh;
  display: flex;
  gap: 10px;
  margin-bottom: 1rem;
  background-color: #fff;
  padding: 5px;

  @media only screen and (max-width: 768px) {
    width: var(--container-width);
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 3;
  padding: 1rem;
  display: flex;
  justify-content: center;
`;
const Right = styled.div`
  flex: 2;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InStock = styled.p<{ $inStock: boolean; }>`
  background-color: ${({ $inStock }) => $inStock ? '#03d1031f' : '#cccccc89'};
  color: ${({ $inStock }) => $inStock ? 'green' : '#575757'};
  width: max-content;
  padding: 8px 10px;
  border-radius: 3px;
`;

const ProductName = styled.h2`
  color: #838383;
  margin-bottom: 3rem;
`;

const ProductImage = styled.div`
  width: 300px;
  height: 300px;
  position: relative;
`;


const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Buttons = styled.div`
  display: flex;
  gap: 5px;
`;