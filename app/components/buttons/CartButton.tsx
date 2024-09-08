import { LuShoppingCart } from "react-icons/lu";
import { StyledButton } from '@/app/globalStyles';
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { ProductProps } from '@/app/types'
import { useCart } from "@/app/contexts/cartContext";

const CartButton = ({ product }: { product: ProductProps}) => {
  const router = useRouter();
  const { cartProducts, addToCart } = useCart();

  return (
    <Suspense>
      {
        cartProducts?.find(item => item.id === product?.id) ?
          <StyledButton onClick={() => router.push('/cart')}><LuShoppingCart size={20} />Səbətə get</StyledButton>
          :
          <StyledButton onClick={() => addToCart(product)}><LuShoppingCart size={20} />Səbətə əlavə et</StyledButton>
      }
    </Suspense>

  )
}

export default CartButton
