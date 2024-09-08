import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { ProductProps } from "../types";

type favoriteContextType = {
    favoriteProducts: ProductProps[] | null;
    setFavoriteProducts: any;
    addToFavorite: (product: ProductProps) => void;
    removeFromFavorite: (productId: string) => void;
}

const initialState: favoriteContextType = {
    favoriteProducts: [],
    setFavoriteProducts: () => { },
    addToFavorite: () => { },
    removeFromFavorite: () => { }
}

const FavoriteContext = createContext<favoriteContextType>(initialState);

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
    const [favoriteProducts, setFavoriteProducts] = useState<ProductProps[] | null>(null);

    useEffect(() => {
        const localProducts: any = localStorage.getItem('favorite');
        setFavoriteProducts(JSON.parse(localProducts))
    }, [])

    const addToFavorite = (product: ProductProps) => {
        const newProduct: ProductProps = {
            ...product, quantity: 0
        }
        setFavoriteProducts(prev => {
            let localCart;
            if (prev) {
                localCart = [...prev, newProduct]
            } else {
                localCart = [newProduct]
            }

            localStorage.setItem('favorite', JSON.stringify(localCart));
            return localCart;
        });

    }

    const removeFromFavorite = (productId: string) => {
        setFavoriteProducts((prev): any => {
            let filteredProducts;
            if(prev) {
                filteredProducts = favoriteProducts?.filter(product => product.id !== productId);
            } else {
                return;
            }

            localStorage.setItem("favorite", JSON.stringify(filteredProducts));
            return filteredProducts;
        })

    }

    const value = {
        favoriteProducts,
        setFavoriteProducts,
        addToFavorite,
        removeFromFavorite
    }

    return (
        <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>
    )
}

export const useFavorite = () => {
    return useContext(FavoriteContext);
}