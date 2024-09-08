import { getCurrentUser } from "@/actions/getUser";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type authContextType = {
    user: any;
    loading: boolean;
    getUser: () => void;
    logout: () => void;
}

const initialState: authContextType = {
    user: null,
    loading: true,
    getUser: () => { },
    logout: () => { }
}

const AuthContext = createContext<authContextType>(initialState);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        getUser();
    }, [])

    const getUser = async() => {
        setLoading(true);
        const user = await getCurrentUser();
        setUser(user)
        setLoading(false);
    }
    const logout = () => {
        setUser(null);
    }

    const value = {
        user, 
        loading,
        getUser, 
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}