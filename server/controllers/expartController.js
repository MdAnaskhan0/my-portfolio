import Expert from '../models/expertModel.js';

export const createExpert = async (req, res) => {
    try {
        const expertData = new Expert(req.body);
        const { expartitemname, expartitemdescription } = expertData;

        const expertExists = await Expert.findOne({ expartitemname });

        if (expertExists) {
            return res.status(400).json({ message: 'Expert already exists' });
        }

        const savedExpert = await expertData.save();
        res.status(201).json({ message: 'Expert created successfully', savedExpert });
    } catch (error) {
        res.status(500).json({ message: 'Error creating expert' });
    }
};

export const getExpert = async (req, res) => {
    try {
        const expert = await Expert.findById(req.params.id);
        if (!expert) {
            return res.status(404).json({ message: 'Expert not found' });
        }
        res.status(200).json({ message: 'Expert found', expert });
    } catch (error) {
        res.status(500).json({ message: 'Error getting expert' });
    }
};

export const updateExpert = async (req, res) => {
    try {
        const expert = await Expert.findById(req.params.id);
        if (!expert) {
            return res.status(404).json({ message: 'Expert not found' });
        }
        const updatedExpert = await Expert.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'Expert updated successfully', updatedExpert });
    } catch (error) {
        res.status(500).json({ message: 'Error updating expert' });
    }
};

export const deleteExpert = async (req, res) => {
    try {
        const expert = await Expert.findById(req.params.id);
        if (!expert) {
            return res.status(404).json({ message: 'Expert not found' });
        }
        const deletedExpert = await Expert.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Expert deleted successfully', deletedExpert });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting expert' });
    }
};

export const getAllExpert = async (req, res) => {
    try {
        const expert = await Expert.find();
        res.status(200).json({ message: 'All expert found', expert });
    } catch (error) {
        res.status(500).json({ message: 'Error getting all expert' });
    }
};

