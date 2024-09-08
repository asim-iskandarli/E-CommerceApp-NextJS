import styled from 'styled-components';
import { GoHeartFill } from "react-icons/go";
import { StyledIcon } from '@/app/globalStyles';
import Image from 'next/image';
import Price from './Price';
import { useRouter } from 'next/navigation';
import CartButton from '../buttons/CartButton';
import { useFavorite } from '@/app/contexts/favoriteContext';

const ProductCard = ({ product }: any) => {
    const router = useRouter();
    const {favoriteProducts, addToFavorite, removeFromFavorite } = useFavorite();


    return (
        <StyledCard>
                <Header>
                    {
                        favoriteProducts?.find(item => item.id === product?.id) ?
                            <ProductIcon $selected={true} onClick={() => removeFromFavorite(product.id)}><GoHeartFill /></ProductIcon>
                            :
                            <ProductIcon onClick={() => addToFavorite(product)}><GoHeartFill /></ProductIcon>
                    }
                </Header>
                <Body>
                    <ProductImage onClick={() => router.push(`/product/${product?.id}`)}>
                        <Image src={product.image} fill alt='Product' sizes="100%" />
                    </ProductImage>
                    <ProductName onClick={() => router.push(`/product/${product?.id}`)}>{product?.name}</ProductName>
                    <Price oldPrice={product.oldPrice} newPrice={product.newPrice} />
                </Body>
                <Footer>
                    <CartButton product={product} />
                </Footer>
        </StyledCard>
    )
}

export default ProductCard

const StyledCard = styled.div`
    min-width: 350px;
    width: 350px;
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 1rem;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media only screen and (max-width: 1024px) {
        min-width: 250px !important;
        width: 250px !important;
    }
`


const Header = styled.div`
    padding: 1rem 0;
    display: flex;
    justify-content: flex-end;
`;

const ProductIcon = styled(StyledIcon)<{$selected?: boolean}>`
    font-size: 22px;
    &:hover {
        color: #e94949;
    }
    color: ${({$selected}) => $selected && '#d36464'}
`;

const Body = styled.div`
    padding: 0 1rem;
`;

const ProductImage = styled.div`
    position: relative;
    width: 200px;
    height: 200px;
    margin: 0 auto;
    cursor: pointer;
`;
const ProductName = styled.h5`
  margin-top: 2rem;
  color: #4b4b4b;
  cursor: pointer;
`;

const Footer = styled.div`
    padding: 7px 0;
`;