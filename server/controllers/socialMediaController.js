import UserSocialLinks from '../models/userSocialLinks.js';

export const createSocialMedia = async (req, res) => {
    try {
        const userSocialLinksData = new UserSocialLinks(req.body);
        const { socialmedianame, socialmediaurl } = userSocialLinksData;

        const userSocialLinksExists = await UserSocialLinks.findOne({ socialmedianame });

        if (userSocialLinksExists) {
            return res.status(400).json({ message: 'socail media already exists' });
        }

        const savedUserSocialLinks = await userSocialLinksData.save();
        res.status(201).json({ message: 'User created successfully', savedUserSocialLinks });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
};

export const getSocialMedia = async (req, res) => {
    try {
        const userSocialLinks = await UserSocialLinks.findById(req.params.id);
        if (!userSocialLinks) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User found', userSocialLinks });
    } catch (error) {
        res.status(500).json({ message: 'Error getting user' });
    }
};

export const updateSocialMedia = async (req, res) => {
    try {
        const userSocialLinks = await UserSocialLinks.findById(req.params.id);
        if (!userSocialLinks) {
            return res.status(404).json({ message: 'User not found' });
        }
        const updatedUserSocialLinks = await UserSocialLinks.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'User updated successfully', updatedUserSocialLinks });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
    }
};

export const deleteSocialMedia = async (req, res) => {
    try {
        const userSocialLinks = await UserSocialLinks.findById(req.params.id);
        if (!userSocialLinks) {
            return res.status(404).json({ message: 'User not found' });
        }
        const deletedUserSocialLinks = await UserSocialLinks.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted successfully', deletedUserSocialLinks });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};

export const getAllSocialMedia = async (req, res) => {
    try {
        const userSocialLinks = await UserSocialLinks.find();
        res.status(200).json({ message: 'All users found', userSocialLinks });
    } catch (error) {
        res.status(500).json({ message: 'Error getting all users' });
    }
};
