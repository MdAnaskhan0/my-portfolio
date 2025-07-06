import Skill from '../models/skillModel.js';

export const createSkill = async (req, res) => {
    try {
        const skillData = new Skill(req.body);
        const { skillname, skilldescription, skilllevel } = skillData;

        const skillExists = await Skill.findOne({ skillname });

        if (skillExists) {
            return res.status(400).json({ message: 'Skill already exists' });
        }

        const savedSkill = await skillData.save();
        res.status(201).json({ message: 'Skill created successfully', savedSkill });
    } catch (error) {
        res.status(500).json({ message: 'Error creating skill' });
    }
};

export const getSkill = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }
        res.status(200).json({ message: 'Skill found', skill });
    } catch (error) {
        res.status(500).json({ message: 'Error getting skill' });
    }
};

export const updateSkill = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }
        const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'Skill updated successfully', updatedSkill });
    } catch (error) {
        res.status(500).json({ message: 'Error updating skill' });
    }
};

export const deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }
        const deletedSkill = await Skill.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Skill deleted successfully', deletedSkill });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting skill' });
    }
};

export const getAllSkill = async (req, res) => {
    try {
        const skill = await Skill.find();
        res.status(200).json({ message: 'All skill found', skill });
    } catch (error) {
        res.status(500).json({ message: 'Error getting all skill' });
    }
};  