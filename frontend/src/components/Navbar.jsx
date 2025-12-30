import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Handles logout action
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      // Even if API fails, clear local state
    }
    logout();
    navigate("/login");
  };

  return (
    <nav className="border-b border-gray-300 px-6 py-3 flex justify-between items-center">
      <Link to="/" className="font-semibold">
        PurpleMerit
      </Link>

      <div className="space-x-4 text-sm">
        {!user && (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/signup" className="hover:underline">
              Signup
            </Link>
          </>
        )}

        {user && (
          <>
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>

            {user.role === "admin" && (
              <Link to="/admin/users" className="hover:underline">
                Admin
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="underline"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
