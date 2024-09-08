import React, {createContext, useState} from 'react'

export const AuthContext = createContext({});

export default function AuthProvider({children}) {
    const [token, setToken] = useState('');
    const [user, setUser] = useState({});

    return (
        <AuthContext.Provider value={{token, user, setToken, setUser}}>
            {children}
        </AuthContext.Provider>
  )
}