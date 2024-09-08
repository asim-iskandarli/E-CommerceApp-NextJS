import React from 'react'
import styled from 'styled-components'

interface UploadProductProps {
  setProductImage: (image: File) => void;
}

const UploadProductImage = ({setProductImage}: UploadProductProps) => {

  const handleChangeProductImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files.length > 0){
      setProductImage(e.target.files[0]);
    }
  }

  return (
    <Container>
        <Title>Məhsulun şəkili</Title>
        <input type="file" onChange={handleChangeProductImage}/>
    </Container>
  )
}

export default UploadProductImage

const Container = styled.div` 
  padding: 1rem;
`;

const Title = styled.p`
  margin-bottom: 10px;
`;