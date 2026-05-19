import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../../hooks/useAuth';

const ProtectedRoute = () => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? <Outlet /> : <Navigate to='/login' replace />;
};

export default ProtectedRoute;
