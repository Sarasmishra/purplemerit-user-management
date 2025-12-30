import User from "../models/User.js";

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
