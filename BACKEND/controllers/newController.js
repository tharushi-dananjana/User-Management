const User = require('../model/User');

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An error occurred while fetching users.' });
  }
};

// Add new user
const addUser = async (req, res, next) => {
  const { userName, userPhone, userGmail, userPassword, UserAgree } = req.body;

  try {
    const user = new User({
      userName,
      userPhone,
      userGmail,
      userPassword,
      UserAgree,
      isActive: true, // default active
    });
    await user.save();
    return res.status(201).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An error occurred while adding a user.' });
  }
};

// Get user by ID
const getById = async (req, res, next) => {
  const id = req.params.id.trim();

  if (!id || id.length !== 24) {
    return res.status(400).json({ message: 'Invalid user ID format.' });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An error occurred while fetching the user.' });
  }
};

// ✅ FIXED: define updateUser as const
const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { userName, userPhone, userGmail, userPassword, UserAgree, isActive } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        userName,
        userPhone,
        userGmail,
        userPassword,
        UserAgree: Boolean(UserAgree),
        isActive: isActive === true || isActive === 'true',
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update user', error: err });
  }
};

// Delete user
const deleteUser = async (req, res, next) => {
  const id = req.params.id.trim();

  if (!id || id.length !== 24) {
    return res.status(400).json({ message: 'Invalid user ID format.' });
  }

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    return res.status(200).json({ message: 'User successfully deleted.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An error occurred while deleting the user.' });
  }
};

// Toggle user active/deactive status
const toggleUserStatus = async (req, res, next) => {
  const id = req.params.id.trim();

  if (!id || id.length !== 24) {
    return res.status(400).json({ message: 'Invalid user ID format.' });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.isActive = !user.isActive;
    await user.save();

    return res.status(200).json({
      message: `User has been ${user.isActive ? 'activated' : 'deactivated'} successfully.`,
      user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An error occurred while updating user status.' });
  }
};

// Export all
module.exports = {
  getAllUsers,
  addUser,
  getById,
  updateUser,   // ✅ now correctly defined
  deleteUser,
  toggleUserStatus,
};
