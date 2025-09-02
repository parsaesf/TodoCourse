import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import TaskDetail from "./pages/TaskDetail";
import Navbar from "./components/Navbar";

function App() {
  const loggedIn = !!localStorage.getItem("access");

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={loggedIn ? <Tasks /> : <Navigate to="/login" />} />
        <Route path="/tasks/:id" element={loggedIn ? <TaskDetail /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
