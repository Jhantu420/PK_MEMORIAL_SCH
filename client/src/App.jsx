import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
// import ProtectedRoute from "./auth/protectedRoute";
import PublicRoute from "./auth/PublicRoute";
import Navbar from "./component/Navbar";
import Home from "./pages/HomeCover";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Classes from "./pages/Classes";
import { Footer } from "./component/Footer";
import AdminDashboard from "./dashboard/AdminDashboard";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route> */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
