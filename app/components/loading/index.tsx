import React from 'react'
import styled from 'styled-components'
import {BeatLoader} from 'react-spinners'

const Loading = () => {
  return (
    <Container><BeatLoader color='#55c2da'/></Container>
  )
}

export default Loading

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;