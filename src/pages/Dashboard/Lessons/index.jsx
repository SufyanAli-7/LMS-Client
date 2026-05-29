import { Route, Routes } from "react-router-dom";
import UploadLesson from "./UploadLesson";
import EditLesson from "./EditLesson";

const Lessons = () => {
    return (
        <Routes>
            <Route path="/upload" element={<UploadLesson />} />
            <Route path="/edit/:lessonId" element={<EditLesson />} />
        </Routes>
    );
};

export default Lessons;
