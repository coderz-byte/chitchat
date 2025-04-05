import { Navigate, Outlet } from "react-router";

import { useAuthStore } from "../store/useAuthStore";

const ProtectedRoutes = () => {
  const { authUser } = useAuthStore();

  if (authUser) return <Outlet />;

  return <Navigate to="/login" />;
};

export default ProtectedRoutes;
