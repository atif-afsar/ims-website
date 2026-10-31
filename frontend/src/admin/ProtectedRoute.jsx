import { Navigate, useLocation } from "react-router";
import { AuthStatusScreen, useApiAuth } from "./ApiAuth";

/* Every /admin page sits behind this: no session → the login page */
const ProtectedRoute = ({ children }) => {
  const { status } = useApiAuth();
  const location = useLocation();

  if (status === "checking" || status === "offline") return <AuthStatusScreen />;
  if (status === "out") return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  return children;
};

export default ProtectedRoute;
