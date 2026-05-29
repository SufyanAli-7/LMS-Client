import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Page404 from '@/components/Misc/Page404'
import InstructorLogin from './InstructorLogin'
import AdminLogin from './AdminLogin'

const Auth = () => {
    return (
        <Routes>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='instructor/login' element={<InstructorLogin />} />
            <Route path='admin/login' element={<AdminLogin />} />
            <Route path='*' element={<Page404 />} />
        </Routes>
    )
}
export default Auth