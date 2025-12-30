import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Display name (separate from email to allow future changes)
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    // Unique login identifier (normalized to avoid duplicates)
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Hashed password; excluded from queries by default
    password: {
      type: String,
      required: true,
      select: false,
    },

    // Authorization level for RBAC
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    // Controls whether the user can authenticate
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    // Tracks last successful login
    lastLogin: {
      type: Date,
    },
  },
  {
    // Automatically manages createdAt & updatedAt
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
