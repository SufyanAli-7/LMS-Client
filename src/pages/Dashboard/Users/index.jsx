import { Route, Routes } from "react-router-dom"
import All from "./All"
import AddInstructor from "./AddInstructor"

const Users = () => {
    return (
       <Routes>
        <Route path="/" element={<All />} />
        <Route path="/add-instructor" element={<AddInstructor />} />
        </Routes>
    )
}

export default Users