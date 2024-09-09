"use client"
import React, { useState } from 'react'
import styled from 'styled-components'
import { MdClose } from "react-icons/md";
import { StyledButton, StyledIcon, StyledInput } from '@/app/globalStyles';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { categoryOptions } from './data';
import UploadProductImage from './UploadProductImage';
import { toast } from 'react-hot-toast';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebaseApp from '@/lib/firebase';
import axios from 'axios';
import { useProduct } from '@/app/contexts/productContext';
import { useAuth } from '@/app/contexts/authContext';
import { MoonLoader } from 'react-spinners'

type CreateProductProps = {
    name: string;
    oldPrice: number;
    newPrice: number;
    inStock: boolean;
    category: string,
    image: string;
}

const CreateProduct = () => {
    const [isActive, setIsActive] = useState(false);
    const [productData, setProductData] = useState<CreateProductProps>({
        name: '',
        oldPrice: 0,
        newPrice: 0,
        inStock: true,
        category: '',
        image: ''
    });
    const [loading, setLoading] = useState<boolean>(false);

    const { createProduct } = useProduct();
    const { user } = useAuth();

    const [productImage, setProductImage] = useState<any>();

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

        if (!productImage || !productData.name) return;
        setLoading(true);
        
        try {
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `/images/${productData.name}`);
            const uploadTask = uploadBytesResumable(storageRef, productImage);

            uploadTask.on('state_changed',
                (snapshot) => {
                    // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                () => {
                    toast.error('Bir xəta baş verdi');
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        // uploadedImages = [...uploadedImages, downloadURL]

                        axios.post('/api/product', { ...productData, image: downloadURL })
                            .then(({ data }) => {
                                createProduct(data, user);
                                setIsActive(false);
                                toast.success('Yeni məhsul uğurla yaradılmışdır');
                            }).catch(() => {
                                toast.error('Bir xəta baş verdi');
                            }).finally(() => {
                                setLoading(false);
                            })
                    });
                }
            );
        } catch {
            toast.error('Bir xəta baş verdi');
            setLoading(false);
        }
    }

    return (
        <Container>
            <CreateBtn onClick={() => setIsActive(true)}>Yeni</CreateBtn>
            {
                isActive &&
                <CreateBox>
                    <CreateCart>
                        <Header>
                            <StyledIcon onClick={() => setIsActive(false)}><MdClose size={20} /></StyledIcon>
                        </Header>
                        <Form onSubmit={handleSubmit}>
                            <InputField>
                                <StyledInput type='text' placeholder='Məhsulun adı' name="name" onChange={handleChangeInput} />
                            </InputField>
                            <PriceField>
                                <InputField>
                                    <StyledInput type='number' placeholder='Köhnə qiyməti' name="oldPrice" onChange={handleChangeInput} />
                                </InputField>
                                <InputField>
                                    <StyledInput type='number' placeholder='Yeni qiyməti' name="newPrice" onChange={handleChangeInput} />
                                </InputField>
                            </PriceField>
                            <InputField>
                                <input type="checkbox" id="inStock" name="inStock" onChange={handleChangeCheckboxInput} defaultChecked={productData.inStock} />
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
                            <InputField>
                                <UploadProductImage setProductImage={setProductImage} />
                            </InputField>
                            <CreateButton>{loading ? <MoonLoader color="#55c2da" size={16} /> : 'Yaratmaq'}</CreateButton>
                        </Form>
                    </CreateCart>
                </CreateBox>
            }
        </Container>
    )
}

export default CreateProduct

const Container = styled.div`
    width: 100%;
    margin-bottom: 1rem;
`;

const CreateBtn = styled(StyledButton)`
    width: 120px;
    height: 40px;
    border: 1px solid var(--primary);
    color: var(--primary);
    font-size: 16px;

    &:hover {
        border: 1px solid var(--primary-hover);
    }
`;

const CreateBox = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #00000022;
    z-index: 99;
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

    &:hover {
        color: green;
        border: 1px solid green;
        background-color: #00800039;
    }
`;

