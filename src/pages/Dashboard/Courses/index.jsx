import { Route, Routes } from "react-router-dom";
import ManageCourses from "./ManageCourses";
import CreateCourse from "./CreateCourse";
import EditCourse from "./EditCourse";

const Courses = () => {
    return (
        <Routes>
            <Route path="/" element={<ManageCourses />} />
            <Route path="/create" element={<CreateCourse />} />
            <Route path="/edit/:courseId" element={<EditCourse />} />
        </Routes>
    );
};

export default Courses;
