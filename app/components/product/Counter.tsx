import { useCart } from '@/app/contexts/cartContext';
import { ProductProps } from '@/app/types';
import React from 'react'
import styled from 'styled-components';

interface CounterProps {
  cardProduct: ProductProps;
}

const Counter: React.FC<CounterProps> = ({ cardProduct }) => {
  const { cartProducts, setCartProducts } = useCart();

  const hendleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newQuantity: number = Number(e.target.value);

    if (newQuantity < 0) {
      newQuantity = newQuantity * -1;
    } else if (newQuantity > 50) {
      newQuantity = 50;
    }
    const newCartProducts = cartProducts?.map((product: ProductProps) =>
      ({ ...product.id === cardProduct.id ? { ...product, quantity: newQuantity } : product }))
    setCartProducts(newCartProducts);
  }

  const increaseFunc = () => {
    if (cardProduct.quantity == 50) return;
    const newCartProducts = cartProducts?.map((product: ProductProps) =>
      ({ ...product.id === cardProduct.id ? { ...product, quantity: Number(product.quantity) + 1 } : product }))
    setCartProducts(newCartProducts);
    localStorage.setItem("cart", JSON.stringify(newCartProducts));
  }

  const decreaseFunc = () => {
    if (cardProduct.quantity <= 1) return;
    const newCartProducts = cartProducts?.map((product: ProductProps) =>
      ({ ...product.id === cardProduct.id ? { ...product, quantity: Number(product.quantity) - 1 } : product }))
    setCartProducts(newCartProducts);
    localStorage.setItem("cart", JSON.stringify(newCartProducts));
  }

  return (
    <StyledCounter>
      <CounterButton onClick={decreaseFunc}>-</CounterButton>
      <CounterInput type="number" name="qty" value={cardProduct.quantity} onChange={hendleChangeInput} />
      <CounterButton onClick={increaseFunc}>+</CounterButton>
    </StyledCounter>
  )
}

export default Counter

const StyledCounter = styled.div`
  display: flex;
  gap: 10px;
`;

const CounterButton = styled.button`
  border: 1px solid #a8a8a8;
  width: 40px;
  height: 40px;
  font-size: 22px;
  background: none;
  cursor: pointer;
  color: #a8a8a8;
  border-radius: 5px;

  @media only screen and (max-width: 768px) {
    width: 25px;
    height: 25px;
    font-size: 16px;
  }
`;

const CounterInput = styled.input`
  border: none;
  width: 50px;
  text-align: center;
  font-size: 18px;

  @media only screen and (max-width: 768px) {
    width: 20px;
    font-size: 16px;
  }

  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;