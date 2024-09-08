"use client"
import React, { useState } from 'react'
import styled from 'styled-components'
import { MdClose } from "react-icons/md";
import { StyledButton, StyledIcon, StyledInput } from '@/app/globalStyles';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { categoryOptions } from './data';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useProduct } from '@/app/contexts/productContext';
import { MoonLoader } from 'react-spinners'
import { ProductProps } from '@/app/types';

const EditProduct = ({ toggleEdit, product }: any) => {
    const [productData, setProductData] = useState<ProductProps>(product);
    const [loading, setLoading] = useState<boolean>(false);

    const { updateProduct } = useProduct();

    const animatedComponents = makeAnimated();


    const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.target as HTMLInputElement
        setProductData((prev) => ({ ...prev, [name]: value }))
    }
    const handleChangeCategoryInput = (e: { value: string; label: string; }) => {
        setProductData((prev) => ({ ...prev, category: e.value }))
    }
    const handleChangeCheckboxInput = (e: any) => {
        setProductData((prev) => ({ ...prev, inStock: e.target.checked }))
    }



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        try {
            if (!productData.name) return;

            axios.post('/api/product/update', productData)
                .then(({ data }) => {
                    updateProduct(productData);
                    toggleEdit();
                    toast.success('Dəyişiklik uğurla yadda saxlanıldı');
                }).catch(() => {
                    toast.error('Bir xəta baş verdi');
                }).finally(() => {
                    setLoading(false);
                })
        } catch (error) {
            toast.error('Bir xəta baş verdi');
            setLoading(false);
        }
    }

    return (
        <Container>
            <EditBox>
                <CreateCart>
                    <Header>
                        <StyledIcon onClick={toggleEdit}><MdClose size={20} /></StyledIcon>
                    </Header>
                    <Form onSubmit={handleSubmit}>
                        <InputField>
                            <StyledInput type='text' placeholder='Məhsulun adı' name="name" onChange={handleChangeInput} value={productData.name} />
                        </InputField>
                        <PriceField>
                            <InputField>
                                <StyledInput type='number' placeholder='Köhnə qiyməti' name="oldPrice" onChange={handleChangeInput} value={productData.oldPrice} />
                            </InputField>
                            <InputField>
                                <StyledInput type='number' placeholder='Yeni qiyməti' name="newPrice" onChange={handleChangeInput} value={productData.newPrice} />
                            </InputField>
                        </PriceField>
                        <InputField>
                            <input type="checkbox" id="inStock" name="inStock" onChange={handleChangeCheckboxInput} defaultChecked={productData.inStock} checked={productData.inStock} />
                            <label htmlFor='inStock'>Məhsul stokda var?</label>
                        </InputField>
                        <InputField>
                            <Select
                                closeMenuOnSelect={true}
                                components={animatedComponents}
                                placeholder="Kateqoriyalar"
                                options={categoryOptions}
                                name='category'
                                onChange={(e: any) => handleChangeCategoryInput(e)}
                            />
                        </InputField>
                        <CreateButton>{loading ? <MoonLoader color="#55c2da" size={16} /> : 'Yadda saxla'}</CreateButton>
                    </Form>
                </CreateCart>
            </EditBox>
        </Container>
    )
}

export default EditProduct

const Container = styled.div`
    width: 100%;
    margin-bottom: 1rem;
`;



const EditBox = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #00000022;
    z-index: 100;
`;

const CreateCart = styled.div`
    width: 600px;
    background-color: #fff;
    border-radius: 1rem;
    padding: 1rem;

    @media only screen and (max-width: 512px) {
        width: 95%;
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const Form = styled.form`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const InputField = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    gap: 5px;
`;

const PriceField = styled.div`
    display: flex;
    gap: 1rem;
`;

const CreateButton = styled(StyledButton)`
    height: 50px;
    border: 1px solid green;
    color: green;
    font-size: 16px;
    &:hover {
        color: green;
        border: 1px solid green;
        background-color: #00800039;
    }
`;

