import { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export const useAlert = () => {
    return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState(null);
    return <AlertContext.Provider value={{ alert, setAlert }}>{children}</AlertContext.Provider>;
};

export default AlertContext;