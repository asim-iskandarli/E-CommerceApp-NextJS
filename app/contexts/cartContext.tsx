import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { ProductProps } from "../types";

type cartContextType = {
    cartProducts: ProductProps[] | null;
    setCartProducts: any;
    addToCart: (product: ProductProps) => void;
    removeFromCart: (productId: string) => void;
}


const initialState: cartContextType = {
    cartProducts: [],
    setCartProducts: () => { },
    addToCart: () => { },
    removeFromCart: () => { }
}

const CartContext = createContext<cartContextType>(initialState);


export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartProducts, setCartProducts] = useState<ProductProps[] | null>(null);

    useEffect(() => {
        const localProducts: any = localStorage.getItem('cart');
        setCartProducts(JSON.parse(localProducts))
    }, [])

    const addToCart = (product: ProductProps) => {
        const newProduct: ProductProps = {
            ...product, quantity: 0
        }
        setCartProducts(prev => {
            let localCart;
            if (prev) {
                localCart = [...prev, newProduct]
            } else {
                localCart = [newProduct]
            }
            console.log(localCart)
            localStorage.setItem('cart', JSON.stringify(localCart));
            return localCart;
        });

    }

    const removeFromCart = (productId: string) => {
        setCartProducts((prev): any => {
            let filteredProducts;
            if(prev) {
                filteredProducts = cartProducts?.filter(product => product.id !== productId);
            } else {
                return;
            }

            localStorage.setItem("cart", JSON.stringify(filteredProducts));
            return filteredProducts;
        })

    }

    const value = {
        cartProducts,
        setCartProducts,
        addToCart,
        removeFromCart
    }

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}

export const useCart = () => {
    return useContext(CartContext);
}