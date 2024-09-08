import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <StyledFooter>
      <Container>
        <Item>
          <ItemTitle>Müştəri üçün</ItemTitle>
          <ul>
            <li>Sual-Cavab</li>
            <li>Hissə-hissə ödəniş</li>
            <li>İstifadə qaydaları</li>
          </ul>
        </Item>
        <Item>
          <ItemTitle>Şirkət</ItemTitle>
          <ul>
            <li>Haqqımızda</li>
            <li>Mağazalar</li>
            <li>Vakansiyalar</li>
            <li>Kampaniyalar</li>
          </ul>
        </Item>
        <Item>
          <ItemTitle>Əlaqə</ItemTitle>
          <InfoCard>*2696</InfoCard>
        </Item>
      </Container>
    </StyledFooter>
  )
}

export default Footer

const StyledFooter = styled.div`
  min-height: 300px;
  background-color: #fff;
  padding-top: 2rem;
  margin-top: 1rem;
  box-shadow: var(--box-shadow);

  @media only screen and (max-width: 512px) {
    min-height: 220px;
  }
`;

const Container = styled.div`
  width: var(--container-width);
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
`;

const Item = styled.div`
  ul {
    li {
      list-style-type: none;
      margin-top: 1rem;
      &:first-child {
        margin-top: 1.5rem;
      }

      @media only screen and (max-width: 512px) {
        font-size: 12px;
      }
    }
  }
`;

const ItemTitle = styled.h4``;

const InfoCard = styled.h3`
  margin-top: 1.5rem;
  color: var(--primary);
`;