import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./auth/protectedRoute";
import PublicRoute from "./auth/PublicRoute";
import Navbar from "./component/Navbar";
// import Home from "./pages/HomeCover";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Classes from "./pages/Classes";
import { Footer } from "./component/Footer";
import RegisterStudent from "./dashboard/RegisterStudent";
import RegisterTeacher from "./dashboard/RegisterTeacher";
import DashboardLayout from "./dashboard/DashboardLayout";
import CreateClass from "./dashboard/CreateClass";
import ClassDashboard from "./dashboard/ClassDashboard";
import TeacherDashboard from "./dashboard/TeacherDashboard";
import StudentDashboard from "./dashboard/StudentDashboard";
import UploadImage from "./dashboard/UploadImage";
import UserGallery from "./pages/UserGallery";
import UploadVideo from "./dashboard/UploadVideo";
import VideoGallery from "./pages/VideoGallery";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/image-gallery" element={<UserGallery />} />
        <Route path="/video-gallery" element={<VideoGallery />} />


        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<StudentDashboard />} />{" "}
            {/*this index route will show when we click on dashboard route */}
            <Route path="register-student" element={<RegisterStudent />} />
            <Route path="register-teachers" element={<RegisterTeacher />} />
            <Route path="create-class" element={<CreateClass />} />
            <Route path="class-dashboard" element={<ClassDashboard />} />
            <Route path="teacher-dashboard" element={<TeacherDashboard />} />
            <Route path="upload-image" element={<UploadImage />} />
            <Route path="upload-video" element={<UploadVideo />} />
          </Route>
        </Route>

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App;
