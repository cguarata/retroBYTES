import { createContext } from "react";
import { useLocalStorage } from "./UseLocalStore";

const TokenContext = createContext();
const TokenProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("authToken", "");
  return (
    <TokenContext.Provider value={[token, setToken]}>
      {children}
    </TokenContext.Provider>
  );
};

export { TokenContext, TokenProvider };