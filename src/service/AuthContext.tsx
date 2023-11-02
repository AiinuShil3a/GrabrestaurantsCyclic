import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  roles: string | null;
  setRoles: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserData = JSON.parse(localStorage.getItem("user") || "{}");
    const storedUsername = storedUserData.username;
    const storedRoles = storedUserData.roles;

    if (token && storedUsername) {
      setIsLogged(true);
      setUsername(storedUsername);
      setRoles(storedRoles);
    } else {
      setIsLogged(false);
      setUsername("");
      setRoles(null);
    }
  }, []);

  const [roles, setRoles] = useState<string | null>(null);

  return (
    <AuthContext.Provider
      value={{ isLogged, setIsLogged, username, setUsername, roles, setRoles }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
