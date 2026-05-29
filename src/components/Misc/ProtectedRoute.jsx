import { useAuth } from "@/context/AuthContext"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ Component , allowedRoles }) => {
    const { isAuth , user } = useAuth()
  if (!isAuth) {
    const lastRole = localStorage.getItem('lastRole')
    if (lastRole === 'admin') {
      return <Navigate to='/auth/admin/login' replace />
    } else if (lastRole === 'instructor') {
      return <Navigate to='/auth/instructor/login' replace />
    } else {
      return <Navigate to='/auth/login' replace />
    }
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to='/dashboard' replace />
  return <Component />
}

export default ProtectedRoute 