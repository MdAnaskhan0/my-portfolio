import ExperienceModel from '../models/experienceModel.js';

export const createExperience = async (req, res) => {
    try {
        const experienceData = new Experience(req.body);
        const { companyname, jobtitle, department, startdate, enddate, description } = experienceData;

        const experienceExists = await Experience.findOne({ companyname });

        if (experienceExists) {
            return res.status(400).json({ message: 'Experience already exists' });
        }

        const savedExperience = await experienceData.save();
        res.status(201).json({ message: 'Experience created successfully', savedExperience });
    } catch (error) {
        res.status(500).json({ message: 'Error creating experience' });
    }
};

export const getExperience = async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }
        res.status(200).json({ message: 'Experience found', experience });
    } catch (error) {
        res.status(500).json({ message: 'Error getting experience' });
    }
};

export const updateExperience = async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }
        const updatedExperience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'Experience updated successfully', updatedExperience });
    } catch (error) {
        res.status(500).json({ message: 'Error updating experience' });
    }
};

export const deleteExperience = async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }
        const deletedExperience = await Experience.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Experience deleted successfully', deletedExperience });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting experience' });
    }
};

export const getAllExperience = async (req, res) => {
    try {
        const experience = await Experience.find();
        res.status(200).json({ message: 'All experience found', experience });
    } catch (error) {
        res.status(500).json({ message: 'Error getting all experience' });
    }
};