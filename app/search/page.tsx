"use client"
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Price from '../components/product/Price'
import { StyledInput } from '../globalStyles'
import CartButton from '../components/buttons/CartButton'
import { useSearchParams } from "next/navigation";
import { useProduct } from '../contexts/productContext'
import { ProductProps } from '../types'

const Search = () => {
    const searchParams = useSearchParams();
    const search = searchParams?.get('search');
    const { allProducts } = useProduct();
    const [products, setProducts] = useState<ProductProps[]>([])
    const [searchProduct, setSearchProduct] = useState<any>(search);

    useEffect(() => {
        if (search) {
            setSearchProduct(search)
        } else {
            setProducts(allProducts)
        }
    }, [allProducts, search])

    useEffect(() => {
        if (searchProduct) {
            const products = allProducts?.filter((product) => product.name.toLowerCase().includes(searchProduct))
            setProducts(products)
        } else {
            setProducts(allProducts)
        }

    }, [allProducts, searchProduct])

    return (
        <StyledSearch>
            <Top>
                <Title>Axtarış</Title>
                <SearchInput placeholder='Məhsulun adı' value={searchProduct} onChange={(e) => setSearchProduct(e.target.value.toLowerCase())} />
            </Top>
            <Bottom>
                <Left>
                    {
                        products?.map((product) => (
                            <Product key={product.id}>
                                <ProductImage><Image src={product.image} fill alt='ProductImage' /></ProductImage>
                                <ProductBody>
                                    <BodyTop>
                                        <ProductName>{product.name}</ProductName>
                                    </BodyTop>
                                    <BodyBottom>
                                        <Price oldPrice={product.oldPrice} newPrice={product.newPrice} />
                                        <Button>
                                            <CartButton product={product} />
                                        </Button>
                                    </BodyBottom>
                                </ProductBody>
                            </Product>
                        ))
                    }
                </Left>
            </Bottom>
        </StyledSearch>
    )
}

export default Search;

const StyledSearch = styled.div`
    background-color: #fff;
    padding: 5px;
    display: flex;
    flex-direction: column;
    min-height: 70vh;
`;

const Top = styled.div`
    display: flex;
    align-items: center;

    gap: 1rem;
`;


const Title = styled.h3`
    padding: 1rem;
`;

const SearchInput = styled(StyledInput)`
    width: 60%;
`;


const Bottom = styled.div`
    display: flex;
    gap: 1rem;
`;

const Left = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-top: 1px solid #ddd;
    padding: 1rem;
`;

const Product = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;
`;
const ProductBody = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
`;
const BodyTop = styled.div`
    width: 85%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const BodyBottom = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;
`;

const Button = styled.div`
    width: 200px;
`;
const ProductImage = styled.div`
    width: 150px;
    height: 150px;
    position: relative;
`;
const ProductName = styled.h3``;
