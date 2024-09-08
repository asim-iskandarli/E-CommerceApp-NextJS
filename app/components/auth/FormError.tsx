import React from 'react'
import { RxExclamationTriangle } from "react-icons/rx";
import styled from 'styled-components';

const FormError = ({message}: {message: string}) => {
  return (
    <Container>
        <RxExclamationTriangle />
        {message}
    </Container>
  )
}

export default FormError

const Container = styled.div`
    background-color: #d3545444;
    color: #d35454;
    padding: 11px;
    display: flex;
    border-radius: 6px;
    align-items: center;
    gap: 7px;
`;