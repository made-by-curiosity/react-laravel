import { createContext, useContext, useState, type ReactNode } from "react";
import { localStorageManager } from "../services/localStorageManager";
import { logOutUser } from "../api/userLogOut";

type User = {
    email: string;
} | null;

interface IUserContext {
    user: User;
    setUser: (user: User) => void;
    logout: () => void;
};

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User>(null);

    const logout = () => {
        logOutUser().then(() => {
            setUser(null);
            localStorageManager.eraseUserInfo();
        })
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
