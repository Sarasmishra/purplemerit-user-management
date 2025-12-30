import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import Loader from "../components/Loader";
import { isValidEmail, isStrongPassword } from "../utils/validators";

export default function Signup() {
  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UX state
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  // Client-side validation
  const validate = () => {
    const errs = {};

    if (!fullName) errs.fullName = "Full name is required";

    if (!email) errs.email = "Email is required";
    else if (!isValidEmail(email))
      errs.email = "Invalid email format";

    if (!password)
      errs.password = "Password is required";
    else if (!isStrongPassword(password))
      errs.password =
        "Password must be at least 8 characters and include uppercase, lowercase, and a number";

    if (password !== confirmPassword)
      errs.confirmPassword = "Passwords do not match";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      const res = await api.post("/auth/signup", {
        fullName,
        email,
        password,
      });

      login(res.data.user, res.data.token);
      showToast("Signup successful", "success");
      navigate("/profile");
    } catch (err) {
      showToast(
        err.response?.data?.message || "Signup failed",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader text="Creating account..." />;

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Signup</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border px-3 py-2 rounded"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {errors.fullName && (
            <p className="text-xs text-red-600">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-xs text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-xs text-red-600">
              {errors.password}
            </p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border px-3 py-2 rounded"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-600">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:opacity-90"
        >
          Signup
        </button>
      </form>

      <p className="text-sm mt-4">
        Already have an account?{" "}
        <Link to="/login" className="underline">
          Login
        </Link>
      </p>
    </div>
  );
}
