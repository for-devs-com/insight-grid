import {createContext, PropsWithChildren, useCallback, useContext, useEffect, useState} from "react";
import {useSession, signIn, signOut} from "next-auth/react";

export type AppProviderProps = PropsWithChildren


export default function AppProvider({children}: AppProviderProps) {
    const { data: session, status } = useSession();
    const [user, setUser] = useState();
    const [isLoadingUser, setIsLoadingUser] = useState(true);

    useEffect(() => {
        if (status === 'authenticated') {
            setUser(user);
            setIsLoadingUser(false);
        } else if (status === 'unauthenticated') {
            setUser(undefined);
            setIsLoadingUser(false);
        }
    }, [status, session]);

    const signIn = useCallback(() => signIn(), []);
    const signOut = useCallback(() => signOut(), []);

    const dbManager = null

    return (
        <AppContext.Provider value={{
            dbManager: dbManager,
            user: null,
            isUserLoggedIn: false,
            logout: () => {}
        }}>
            {children}
        </AppContext.Provider>
    )
}

    export type AppContextValues = {
    dbManager: any
    user: any,
    isUserLoggedIn: boolean
    logout: () => void
}

export const AppContext = createContext<AppContextValues | undefined>(undefined)

export function useApp() {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('AppContext missing. Are you accessing useApp() outside of an AppProvider?')
    }
    return context
}