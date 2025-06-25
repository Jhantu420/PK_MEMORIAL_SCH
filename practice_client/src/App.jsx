import { Routes, Route } from "react-router-dom";
import Login from "./src/pages/Login";
import Dashboard from "./src/pages/Dashboard";
import { PublicRoute } from "./Auth/PublicRoute";
import { ProtectedRoute } from "./Auth/ProtectedRoute";
function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      
    </Routes>
  );
}

export default App;
