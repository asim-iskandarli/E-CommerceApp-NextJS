import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ProductProps, UserType } from "../types";
import axios from "axios";

type productContextType = {
    allProducts: ProductProps[],
    popularProducts: ProductProps[],
    createProduct: (product: ProductProps, User: UserType) => void;
    updateProduct: (product: ProductProps) => void;
    deleteProduct: (productId: String) => void;
    addPapularProduct: (data: [], product: ProductProps) => void;
    deletePopularProduct: (popularProductId: String) => void;
}

const initialState: productContextType = {
    allProducts: [],
    popularProducts: [],
    createProduct: () => { },
    updateProduct: () => { },
    deleteProduct: () => { },
    addPapularProduct: () => { },
    deletePopularProduct: () => { }
}

const ProductContext = createContext<productContextType>(initialState);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [allProducts, setAllProducts] = useState<any>([]);
    const [popularProducts, setPopularProducts] = useState<any>([]);
    // const [loading, setLoading] = useState<boolean | undefined>(true)

    useEffect(() => {
        axios.get('/api/product')
            .then(({ data }) => {
                setAllProducts(data);
        });

        axios.get('/api/product/popular')
            .then(({data}) => {
                setPopularProducts(data);
            })
    }, [])

    const createProduct = async (product: ProductProps, user: UserType) => {
        setAllProducts((prev: ProductProps[]) => [...prev, { ...product, User: user }])
    }
    const updateProduct = async (product: ProductProps) => {
        setAllProducts((prev: ProductProps[]) => [...prev.map(item => (item.id === product.id ? product : item))])
    }

    const deleteProduct = async (productId: String) => {
        setAllProducts((prev: ProductProps[]) => prev.filter((item: ProductProps) => item.id !== productId));
    }

    const addPapularProduct = async (data: any, product: any) => {
        setPopularProducts((prev: any[]) => [...prev, {...data, product}])
    }

    const deletePopularProduct = async (popularProductId: String) => {
        setPopularProducts((prev: ProductProps[]) => prev.filter((item: ProductProps) => item.id !== popularProductId));
    }

    const value = {
        allProducts,
        popularProducts,
        createProduct,
        updateProduct,
        deleteProduct,
        addPapularProduct,
        deletePopularProduct
    }

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProduct = () => {
    return useContext(ProductContext)
}