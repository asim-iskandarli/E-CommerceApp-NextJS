import styled from 'styled-components'

interface PriceProps {
    oldPrice: number;
    newPrice: number;
}

const Price = ({ oldPrice, newPrice }: PriceProps) => {
    return (
        <StyledPrice>
            <OldPrice>{oldPrice} AZN</OldPrice>
            <NewPrice>{newPrice} AZN</NewPrice>
        </StyledPrice>
    )
}

export default Price

const StyledPrice = styled.div`
    margin-top: 6px;
`;

const OldPrice = styled.h4`
    text-decoration: line-through;
    color: #949494dd;
`;
const NewPrice = styled.h3`
    color: var(--primary);
`;