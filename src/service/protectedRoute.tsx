import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface ProtectRouteProps {
  children: ReactNode;
  roles?: string[]; // บทบาทที่จำเป็นสำหรับการเข้าถึง route นี้
}

export const ProtectRoute: React.FC<ProtectRouteProps> = ({
  children,
  roles,
}) => {
  const authContext = useAuth();

  // ตรวจสอบว่า authContext มีค่า (เพื่อป้องกันการใช้งานนอก AuthProvider)
  if (!authContext) {
    throw new Error("ProtectRoute must be used within an AuthProvider");
  }

  const { isLogged, roles: currentUserRoles } = authContext;
  const token = localStorage.getItem("token");

  if (!isLogged && !token) {
    return <Navigate to="/signinorsignup" />;
  }

  if (!isLogged) {
    return <Navigate to="/signinorsignup" />;
  }

  console.log(currentUserRoles);

  if (roles && (!currentUserRoles || !currentUserRoles.includes('ROLE ADMIN'))) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};
