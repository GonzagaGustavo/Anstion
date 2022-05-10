import { createContext, useState } from "react";

export const Context = createContext()

export const loginContext = ({ children }) => {
const [logged, setLogged] = useState(null)

return(
    <Context.Provider value={{logged, setLogged}}>
        {children}
    </Context.Provider>
    )
}