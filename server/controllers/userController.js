import User from '../models/userModel.js';

export const createUser = async (req, res) => {
    try {
        const { file } = req;

        // Use profilepicture (lowercase) here too
        const userData = new User({
            ...req.body,
            profilepicture: file ? file.path : '',
        });

        const { email } = userData;
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const savedUser = await userData.save();
        res.status(201).json({ message: 'User created successfully', savedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};


// controllers/userController.js

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a user object with proper image URL
        const userWithImageUrl = {
            ...user._doc,
            profilepicture: user.profilepicture
                ? `${req.protocol}://${req.get('host')}/${user.profilepicture.replace(/\\/g, '/')}`
                : null
        };

        res.status(200).json({ message: 'User found', user: userWithImageUrl });
    } catch (error) {
        res.status(500).json({ message: 'Error getting user', error: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { file } = req;
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const updateData = {
            ...req.body,
            // Use consistent field name (profilepicture)
            ...(file && { profilepicture: file.path })
        };

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        // Create response with proper image URL
        const userWithImageUrl = {
            ...updatedUser._doc,
            profilepicture: updatedUser.profilepicture
                ? `${req.protocol}://${req.get('host')}/${updatedUser.profilepicture.replace(/\\/g, '/')}`
                : null
        };

        res.status(200).json({
            message: 'User updated successfully',
            updatedUser: userWithImageUrl
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating user',
            error: error.message
        });
    }
};


export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        const usersWithCorrectPath = users.map(user => ({
            ...user._doc,
            profilepicture: user.profilepicture
                ? `${req.protocol}://${req.get('host')}/${user.profilepicture.replace(/\\/g, '/')}`
                : null
        }));

        res.status(200).json({ message: 'All users found', users: usersWithCorrectPath });
    } catch (error) {
        res.status(500).json({ message: 'Error getting all users' });
    }
};
