import projectCategoryModel from '../models/projectCategoryModel.js';

export const createProjectCategory = async (req, res) => {
    try {
        const projectCategoryData = new projectCategoryModel(req.body);
        const { projectcategoryname } = projectCategoryData;

        const projectCategoryExists = await projectCategoryModel.findOne({ projectcategoryname });

        if (projectCategoryExists) {
            return res.status(400).json({ message: 'Project Category already exists' });
        }

        const savedProjectCategory = await projectCategoryData.save();
        res.status(201).json({ message: 'Project Category created successfully', savedProjectCategory });
    } catch (error) {
        res.status(500).json({ message: 'Error creating project Category' });
    }
};

export const getProjectCategory = async (req, res) => {
    try {
        const projectCategory = await projectCategoryModel.findById(req.params.id);
        if (!projectCategory) {
            return res.status(404).json({ message: 'Project Category not found' });
        }
        res.status(200).json({ message: 'Project Category found', projectCategory });
    } catch (error) {
        res.status(500).json({ message: 'Error getting project Category' });
    }
};

export const updateProjectCategory = async (req, res) => {
    try {
        const projectCategory = await projectCategoryModel.findById(req.params.id);
        if (!projectCategory) {
            return res.status(404).json({ message: 'Project Category not found' });
        }
        const updatedProjectCategory = await projectCategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'Project Category updated successfully', updatedProjectCategory });
    } catch (error) {
        res.status(500).json({ message: 'Error updating project Category' });
    }
};

export const deleteProjectCategory = async (req, res) => {  
    try {
        const projectCategory = await projectCategoryModel.findById(req.params.id);
        if (!projectCategory) {
            return res.status(404).json({ message: 'Project Category not found' });
        }
        const deletedProjectCategory = await projectCategoryModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Project Category deleted successfully', deletedProjectCategory });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting project Category' });
    }
};

export const getAllProjectCategory = async (req, res) => {
    try {
        const projectCategory = await projectCategoryModel.find();
        res.status(200).json({ message: 'All project Category found', projectCategory });
    } catch (error) {
        res.status(500).json({ message: 'Error getting all project Category' });
    }
};