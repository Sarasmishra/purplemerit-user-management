import { useEffect, useState } from "react";
import api from "../services/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/profile");
        setUser(res.data.user);
      } catch (err) {
        setError("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <p className="p-6 text-red-600">{error}</p>;
  }

  if (!user) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Profile</h1>

      <div className="space-y-2 text-sm">
        <p>
          <strong>Name:</strong> {user.fullName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        <p>
          <strong>Status:</strong> {user.status}
        </p>
      </div>
    </div>
  );
}
