import React, {
    createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useRef, useState
} from 'react';
import {User} from '../../../models/ShopUserModels'
import * as ShopAuthHelper from './ShopAuthHelper';
import { LayoutSplashScreen } from '../../../../../_h/layout/core/HSplashScreen';


type Props = {
    children: React.ReactNode
}

type ShopAuthContextProps = {
    auth: User | undefined
    saveAuth: (auth: User | undefined) => void
    currentUser: User | undefined
    setCurrentUser: Dispatch<SetStateAction<User | undefined>>
    logout: () => void
}

const ShopInitAuthContextPropsState = {
    auth: ShopAuthHelper.getAuth(),
    saveAuth: () => {},
    currentUser: undefined,
    setCurrentUser: () => {},
    logout: () => {}
}

const ShopAuthContext = createContext<ShopAuthContextProps>(ShopInitAuthContextPropsState)

const ShopUseAuth = () => {
    return useContext(ShopAuthContext);
}

const ShopAuthProvider: FC<Props> = ({ children }) => {
    const [auth, setAuth] = useState<User | undefined>(ShopAuthHelper.getAuth());
    const [currentUser, setCurrentUser] = useState<User | undefined>();

    const saveAuth = (auth: User | undefined) => {
        setAuth(auth);
        if (auth) {
            ShopAuthHelper.setAuth(auth);
        } else {
            ShopAuthHelper.getAuth();
        }
    };

    const logout = () => {
        ShopAuthHelper.removeAuth()
        setCurrentUser(undefined);
    };

    return (
        <ShopAuthContext.Provider value={({auth, saveAuth, currentUser, setCurrentUser, logout})}>
            {children}
        </ShopAuthContext.Provider>
    );
};

const ShopAuthInit: FC<Props> = ({children}) => {
    const {auth, logout, setCurrentUser} = ShopUseAuth()
    const didRequest = useRef(false)
    
    const [showSplashScreen, setShowSplashScreen] = useState(true)

    useEffect(() => {
      const requestUser = async (apiToken: string) => {
        try {
          if (!didRequest.current) {
            const user = ShopAuthHelper.getAuth()
            if (user) {
              setCurrentUser(user)
            }
          }
        } catch (error) {
          if (!didRequest.current) {
            logout()
          }
        } finally {
          setShowSplashScreen(false)
        }
  
        return () => (didRequest.current = true)
      }
  
      if (auth && auth.email) {
        requestUser(auth.email)
      } else {
        logout()
        setShowSplashScreen(false)
      }
    }, [])
  
    return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export { ShopAuthProvider, ShopUseAuth, ShopAuthInit }