// src/components/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";

type Props = { logged: boolean };

export function ProtectedRoute({ logged }: Props) {
  const location = useLocation();

  if (!logged) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}