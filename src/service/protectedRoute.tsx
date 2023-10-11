import { ReactNode } from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from './AuthContext';

interface AuthProviderProps {
    children: ReactNode;
  }
export const ProtectRoute: React.FC<AuthProviderProps> = ({children}) =>{
    const {user} = useAuth();
    if(!user){
        return <Navigate to="/signinorsignup"/>
    }
    return children
}