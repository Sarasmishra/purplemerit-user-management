import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
      console.log("Login submit triggered"); // 👈 add this
    setError("");

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      login(res.data.user, res.data.token);

      if (res.data.user.role === "admin") {
        navigate("/admin/users");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Login</h1>

      {error && (
        <p className="mb-3 text-sm text-red-600">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-black text-white py-2">
          Login
        </button>
      </form>

      <p className="text-sm mt-4">
        Don’t have an account?{" "}
        <Link to="/signup" className="underline">
          Signup
        </Link>
      </p>
    </div>
  );
}
