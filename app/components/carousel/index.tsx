import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";


const Carousel = () => {
    return (
        <Container>
            <Images>
                <Image src="https://plus.unsplash.com/premium_photo-1664201889922-66bc3c778c1e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" fill sizes="100%" alt='Carousel' />
            </Images>
        </Container>
    )
}

export default Carousel;

const Container = styled.div`
    display: flex;
    height: 75vh;
    gap: 5px;
    position: relative;
    align-items: center;
    justify-content: center;

    @media only screen and (max-width: 1024px) {
        height: 60vh;
    }
    @media only screen and (max-width: 768px) {
        height: 50vh;
    }
    @media only screen and (max-width: 512px) {
        height: 25vh;
    }
`;

const Images = styled.div`
    flex: 2;
    height: 100%;
    position: relative;

    img {
        border-radius: 8px;
    }
`;
