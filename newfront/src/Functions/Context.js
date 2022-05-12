import { createContext, useState } from "react";

export const Context = createContext()

export const LoginContext = ({ children }) => {
const [logged, setLogged] = useState(false)
const [login, setLogin] = useState([])

return(
    <Context.Provider value={{logged, setLogged, login, setLogin}}>
        {children}
    </Context.Provider>
    )
}