import { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "../components/Loader";
import { useToast } from "../context/ToastContext";
import FormModal from "../components/FormModal";

export default function Profile() {
  const [user, setUser] = useState(null);

  // Editable profile fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  // Password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // UI state
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  // Modal state
  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const { showToast } = useToast();

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/profile");
        setUser(res.data.user);
        setFullName(res.data.user.fullName);
        setEmail(res.data.user.email);
      } catch {
        showToast("Failed to load profile", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Save profile changes
  const handleProfileSave = async () => {
    try {
      setSavingProfile(true);
      const res = await api.patch("/users/profile", {
        fullName,
        email,
      });

      setUser(res.data.user);
      showToast("Profile updated successfully", "success");
      setEditOpen(false);
    } catch (err) {
      showToast(
        err.response?.data?.message || "Failed to update profile",
        "error"
      );
    } finally {
      setSavingProfile(false);
    }
  };

  // Change password
  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword) {
      showToast("All password fields are required", "error");
      return;
    }

    try {
      setChangingPassword(true);
      await api.patch("/users/change-password", {
        currentPassword,
        newPassword,
      });

      showToast("Password changed successfully", "success");
      setCurrentPassword("");
      setNewPassword("");
      setPasswordOpen(false);
    } catch (err) {
      showToast(
        err.response?.data?.message || "Failed to change password",
        "error"
      );
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) return <Loader text="Loading profile..." />;

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-semibold">My Profile</h1>

      {/* Read-only profile info */}
      <div className="space-y-2 text-sm">
        <p>
          <strong>Full Name:</strong> {user.fullName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex space-x-3">
        <button
          onClick={() => setEditOpen(true)}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Edit Profile
        </button>

        <button
          onClick={() => setPasswordOpen(true)}
          className="px-4 py-2 border rounded"
        >
          Change Password
        </button>
      </div>

      {/* Edit Profile Modal */}
      <FormModal
        open={editOpen}
        title="Edit Profile"
        onClose={() => setEditOpen(false)}
      >
        <div className="space-y-4">
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setEditOpen(false)}
              className="border px-3 py-1 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleProfileSave}
              disabled={savingProfile}
              className="bg-black text-white px-3 py-1 rounded disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </div>
      </FormModal>

      {/* Change Password Modal */}
      <FormModal
        open={passwordOpen}
        title="Change Password"
        onClose={() => setPasswordOpen(false)}
      >
        <div className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            className="w-full border px-3 py-2 rounded"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="New Password"
            className="w-full border px-3 py-2 rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setPasswordOpen(false)}
              className="border px-3 py-1 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handlePasswordChange}
              disabled={changingPassword}
              className="bg-black text-white px-3 py-1 rounded disabled:opacity-50"
            >
              Update
            </button>
          </div>
        </div>
      </FormModal>
    </div>
  );
}
