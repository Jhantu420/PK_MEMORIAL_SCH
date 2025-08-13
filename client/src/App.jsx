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
// import OurKnowledge from "./pages/OurKnowledge";
import OurKnowledge2 from "./pages/ourKnowledge2";
import OurKnowledge3 from "./pages/ourKnowledge3";
import StudentDashboard from "./dashboard/StudentDashboard";
import UploadImage from "./dashboard/UploadImage";

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
        {/* <Route path="/our-knowledge" element={<OurKnowledge />} /> */}
        <Route path="/our-knowledge2" element={<OurKnowledge2 />} />
        <Route path="/our-knowledge3" element={<OurKnowledge3 />} />

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
          </Route>
        </Route>

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
