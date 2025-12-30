import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-300 px-6 py-3 flex justify-between items-center">
      <Link to="/" className="font-semibold">
        PurpleMerit
      </Link>

      <div className="space-x-4 text-sm">
        <Link to="/login" className="hover:underline">
          Login
        </Link>
        <Link to="/signup" className="hover:underline">
          Signup
        </Link>
        <Link to="/profile" className="hover:underline">
          Profile
        </Link>
      </div>
    </nav>
  );
}
