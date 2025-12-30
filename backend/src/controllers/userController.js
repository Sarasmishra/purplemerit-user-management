import User from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/auth.js";

// Admin: fetch all users with pagination
export const getAllUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const users = await User.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalUsers = await User.countDocuments();

    return res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};


// Admin: activate a user account
export const activateUser = async (req, res) => {
  const userId = req.params.id;

  // Prevent admin from modifying own status
  if (req.user.id === userId) {
    return res.status(400).json({
      success: false,
      message: "You cannot modify your own account status",
    });
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { status: "active" },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User activated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to activate user",
    });
  }
};

// Admin: deactivate a user account
export const deactivateUser = async (req, res) => {
  const userId = req.params.id;

  // Prevent admin from modifying own status
  if (req.user.id === userId) {
    return res.status(400).json({
      success: false,
      message: "You cannot modify your own account status",
    });
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { status: "inactive" },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deactivated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to deactivate user",
    });
  }
};

// User: view own profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};

// User: update full name and email
export const updateProfile = async (req, res) => {
  const { fullName, email } = req.body;

  try {
    // Prevent email duplication
    if (email) {
      const existingUser = await User.findOne({
        email,
        _id: { $ne: req.user.id },
      });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Email already in use",
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { fullName, email },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

// User: change password
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await comparePassword(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    user.password = await hashPassword(newPassword);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to change password",
    });
  }
};