import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all users (admin only)
  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data.users);
    } catch (err) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Toggle user active status
  const toggleStatus = async (id, currentStatus) => {
    try {
      await api.patch(`/users/${id}/status`, {
        status: currentStatus === "active" ? "inactive" : "active",
      });

      // Update UI optimistically
      setUsers((prev) =>
        prev.map((u) =>
          u._id === id
            ? { ...u, status: u.status === "active" ? "inactive" : "active" }
            : u
        )
      );
    } catch (err) {
      alert("Failed to update user status");
    }
  };

  if (loading) return <p className="p-6">Loading users...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">All Users</h1>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2 text-left">Name</th>
              <th className="border px-3 py-2 text-left">Email</th>
              <th className="border px-3 py-2 text-left">Role</th>
              <th className="border px-3 py-2 text-left">Status</th>
              <th className="border px-3 py-2 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border px-3 py-2">{user.fullName}</td>
                <td className="border px-3 py-2">{user.email}</td>
                <td className="border px-3 py-2">{user.role}</td>
                <td className="border px-3 py-2">{user.status}</td>
                <td className="border px-3 py-2">
                  <button
                    onClick={() => toggleStatus(user._id, user.status)}
                    className="underline text-sm"
                  >
                    {user.status === "active"
                      ? "Deactivate"
                      : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
