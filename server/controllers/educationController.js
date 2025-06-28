import EducationMode from '../models/educationModel.js';

export const createEducation = async (req, res) => {
    try {
        const educationModeData = new EducationMode(req.body);
        const { degreename, majorname, yearofpassing, institutionname, cgpa } = educationModeData;

        const educationModeExists = await EducationMode.findOne({ degreename });

        if (educationModeExists) {
            return res.status(400).json({ message: 'Education already exists' });
        }

        const savedEducationMode = await educationModeData.save();
        res.status(201).json({ message: 'Education created successfully', savedEducationMode });
    } catch (error) {
        res.status(500).json({ message: 'Error creating education' });
    }
};

export const getEducation = async (req, res) => {
    try {
        const educationMode = await EducationMode.findById(req.params.id);
        if (!educationMode) {
            return res.status(404).json({ message: 'Education not found' });
        }
        res.status(200).json({ message: 'Education found', educationMode });
    } catch (error) {
        res.status(500).json({ message: 'Error getting education' });
    }
};

export const updateEducation = async (req, res) => {
    try {
        const educationMode = await EducationMode.findById(req.params.id);
        if (!educationMode) {
            return res.status(404).json({ message: 'Education not found' });
        }
        const updatedEducationMode = await EducationMode.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'Education updated successfully', updatedEducationMode });
    } catch (error) {
        res.status(500).json({ message: 'Error updating education' });
    }
};

export const deleteEducation = async (req, res) => {
    try {
        const educationMode = await EducationMode.findById(req.params.id);
        if (!educationMode) {
            return res.status(404).json({ message: 'Education not found' });
        }
        const deletedEducationMode = await EducationMode.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Education deleted successfully', deletedEducationMode });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting education' });
    }
};

export const getAllEducation = async (req, res) => {
    try {
        const educationMode = await EducationMode.find();
        res.status(200).json({ message: 'All education found', educationMode });
    } catch (error) {
        res.status(500).json({ message: 'Error getting all education' });
    }
};  