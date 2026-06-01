import axios from "axios";
import { createContext, useContext, useReducer, useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext()

const initialState = { isAuth : false, user: {} }

const reducer = (state, action) => {
    const { type , payload } = action
  switch (type) {
    case "SET_LOGIN":
      const isValidUser = !!(payload && typeof payload === 'object' && Object.keys(payload).length > 0);
      return { isAuth: isValidUser, user: isValidUser ? payload : {} };
    case "SET_LOGOUT":
      return initialState;
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [isAppLoading, setIsAppLoading] = useState(true)
    const navigate = useNavigate()

    const readProfile =() => {
        axios.get('/api/user/data', { withCredentials: true })
        .then((res) => {
            dispatch({ type: "SET_LOGIN", payload: res.data.user })
            if (res.data.user?.role) {
                localStorage.setItem('lastRole', res.data.user.role)
            }
        })
        .catch((error) => {
            console.log(error);
            localStorage.removeItem('token');
        })
        .finally(() => {
            setIsAppLoading(false)
        })
    }

    useEffect(() => {
        readProfile()
    }, [])


    const handleLogout = () => {
        const userRole = state.user?.role;
        axios.post('/api/auth/logout', {}, { withCredentials: true })
        .then(() => {
            localStorage.removeItem('token');
            dispatch({ type: "SET_LOGOUT" })
            if (userRole === 'admin') {
                navigate('/auth/admin/login')
            } else if (userRole === 'instructor') {
                navigate('/auth/instructor/login')
            } else {
                navigate('/auth/login')
            }
            window.toastify("Logout successful", "success")
        })
        .catch((error) => {
            console.log(error);
            localStorage.removeItem('token');
            dispatch({ type: "SET_LOGOUT" })
            navigate('/auth/login')
        })
        .finally(() => {
            setIsAppLoading(false)
        })
    }

  return (
    <AuthContext.Provider value={{ ...state, dispatch, readProfile, handleLogout , isAppLoading }}>
      {children}
    </AuthContext.Provider>
  )
}


export const useAuth = () => useContext(AuthContext)
export default AuthProvider