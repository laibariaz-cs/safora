import { useState, createContext, useContext } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Report";
import MapView from "./pages/mapveiw";
import AdminPanel from "./pages/Adminpannel";
import CreateReport from "./pages/Createreport";

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUserState] = useState(() => {
    try {
      const item = window.localStorage.getItem("user");
      return item ? JSON.parse(item) : null;
    } catch (error) {
      return null;
    }
  });

  const setUser = (newUser) => {
    setUserState(newUser);
    if (newUser) {
      window.localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      window.localStorage.removeItem("user");
    }
  };
  const [toast, setToast] = useState(null);

  const navigate = (p) => { setPage(p); window.scrollTo(0, 0); };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const logout = () => {
    setUser(null);
    navigate("home");
    showToast("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, navigate, showToast, logout }}>
      <div className="app-root">
        <Navbar page={page} navigate={navigate} />
        <main className="main-content">
          {page === "home" && <Home />}
          {page === "login" && <Login />}
          {page === "register" && <Register />}
          {page === "dashboard" && <Dashboard />}
          {page === "reports" && <Reports />}
          {page === "map" && <MapView />}
          {page === "create-report" && <CreateReport />}
          {page === "admin" && <AdminPanel />}
        </main>
        {toast && (
          <div className={`toast toast-${toast.type}`}>
            <span className="toast-icon">
              {toast.type === "success" ? "✓" : toast.type === "error" ? "✕" : "!"}
            </span>
            {toast.msg}
          </div>
        )}
      </div>
    </AuthContext.Provider>
  );
}