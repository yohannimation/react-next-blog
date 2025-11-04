// src/context/UserContext.ts
import { createContext, useContext, useState, ReactNode } from "react";
import type { UserInterface } from "../interface/user.interface";

interface UserContextType {
    user: UserInterface | null;
    login: (userData: UserInterface) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps): JSX.Element => {
    const [user, setUser] = useState<UserInterface | null>(() => {
        // On charge la session depuis localStorage si elle existe
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });

    const login = (userData: UserInterface) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook pratique pour récupérer le contexte
export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within a UserProvider");
    return context;
};
