import React from 'react'
import AllCourses from './AllCourses'
import CourseDetails from './CourseDetails'
import { Routes, Route } from 'react-router-dom'

const Courses = () => {
  return (
    <Routes>
      <Route path='/' element={<AllCourses />} />
      <Route path='/:id' element={<CourseDetails />} />
    </Routes>
  )
}

export default Courses