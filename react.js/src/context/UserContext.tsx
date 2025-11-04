import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { UserInterface } from "../interface/user.interface";
import { jwtDecode } from "jwt-decode"; // npm install jwt-decode

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
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    const login = (userData: UserInterface) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    // 🔑 Vérifier l'expiration du JWT à chaque chargement
    useEffect(() => {
        if (!user?.token) return;

        try {
            const decoded: { exp: number } = jwtDecode(user.token);
            const now = Date.now() / 1000; // en secondes
            const timeLeft = decoded.exp - now;

            if (timeLeft <= 0) {
                logout(); // token déjà expiré
                return;
            }

            // Déconnecter automatiquement quand le token expire
            const timeout = setTimeout(() => {
                logout();
            }, timeLeft * 1000);

            return () => clearTimeout(timeout);
        } catch (err) {
            console.error("Erreur décodage JWT", err);
            logout();
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within a UserProvider");
    return context;
};
