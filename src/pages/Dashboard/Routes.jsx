import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Users from './Users'
import Courses from './Courses'
import Lessons from './Lessons'
import MyCourses from './MyCourses'
import Profile from './Profile'
import ProtectedRoute from '@/components/Misc/ProtectedRoute'

const Index = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users/*' element={<ProtectedRoute allowedRoles={['admin']} Component={Users} />} />
        <Route path='/courses/*' element={<ProtectedRoute allowedRoles={['admin', 'instructor']} Component={Courses} />} />
        <Route path='/lessons/*' element={<ProtectedRoute allowedRoles={['instructor']} Component={Lessons} />} />
        <Route path='/my-courses' element={<ProtectedRoute allowedRoles={['student']} Component={MyCourses} />} />
        <Route path='/profile' element={<ProtectedRoute allowedRoles={['student', 'instructor', 'admin']} Component={Profile} />} />
    </Routes>
  )
}

export default Index