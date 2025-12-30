import { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "../components/Loader";
import ConfirmModal from "../components/ConfirmModal";
import { useToast } from "../context/ToastContext";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const USERS_PER_PAGE = 10;

  // Confirmation modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { showToast } = useToast();

  // Fetch all users (admin only)
  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data.users);
    } catch (err) {
      showToast("Failed to load users", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Pagination calculations
  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

  const paginatedUsers = users.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  // Open confirmation modal
  const openConfirm = (user) => {
    setSelectedUser(user);
    setConfirmOpen(true);
  };

  // Activate / Deactivate user
  const toggleStatus = async () => {
    if (!selectedUser) return;

    try {
      if (selectedUser.status === "active") {
        await api.patch(`/users/${selectedUser._id}/deactivate`);
      } else {
        await api.patch(`/users/${selectedUser._id}/activate`);
      }

      // Update UI optimistically
      setUsers((prev) =>
        prev.map((u) =>
          u._id === selectedUser._id
            ? {
                ...u,
                status:
                  u.status === "active" ? "inactive" : "active",
              }
            : u
        )
      );

      showToast("User status updated successfully", "success");
    } catch (err) {
      showToast("Failed to update user status", "error");
    } finally {
      setConfirmOpen(false);
      setSelectedUser(null);
    }
  };

  if (loading) return <Loader text="Loading users..." />;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">
        Admin Dashboard — Users
      </h1>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2 text-left">
                Full Name
              </th>
              <th className="border px-3 py-2 text-left">
                Email
              </th>
              <th className="border px-3 py-2 text-left">
                Role
              </th>
              <th className="border px-3 py-2 text-left">
                Status
              </th>
              <th className="border px-3 py-2 text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50"
              >
                <td className="border px-3 py-2">
                  {user.fullName}
                </td>
                <td className="border px-3 py-2">
                  {user.email}
                </td>
                <td className="border px-3 py-2">
                  {user.role}
                </td>
                <td className="border px-3 py-2">
                  {user.status}
                </td>
                <td className="border px-3 py-2">
                  <button
                    onClick={() => openConfirm(user)}
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center space-x-3 mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((p) => p - 1)
            }
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((p) => p + 1)
            }
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        open={confirmOpen}
        title="Confirm Action"
        message={`Are you sure you want to ${
          selectedUser?.status === "active"
            ? "deactivate"
            : "activate"
        } this user?`}
        onConfirm={toggleStatus}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
