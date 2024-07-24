
import { Routes,Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AssociateDashboard from "./pages/AssociateDashboard";
import NotFound from "./pages/NotFound";


function App() {

  const login=localStorage.getItem("login");

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/employeedashboard" element={<EmployeeDashboard />} />
        <Route path="/associatedashboard" element={<AssociateDashboard />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );

}

export default App;
