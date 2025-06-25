import projectModel from '../models/projectModel.js';

export const createProject = async (req, res) => {
    try {
        const { projectname, projectdescription, projectcategoryname, projecturl } = req.body;

        const projectExists = await projectModel.findOne({ projectname });
        if (projectExists) {
            return res.status(400).json({ message: 'Project already exists' });
        }

        let projectImageUrl = '';
        if (req.file) {
            projectImageUrl = `/projectImage/${req.file.filename}`;
        }

        const projectData = new projectModel({
            projectname,
            projectdescription,
            projectcategoryname,
            projecturl,
            projectImage: projectImageUrl
        });

        const savedProject = await projectData.save();
        res.status(201).json({ message: 'Project created successfully', savedProject });
    } catch (error) {
        res.status(500).json({ message: 'Error creating project' });
    }
};

export const getProject = async (req, res) => {
    try {
        const project = await projectModel.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json({ message: 'Project found', project });
    } catch (error) {
        res.status(500).json({ message: 'Error getting project' });
    }
};

export const updateProject = async (req, res) => {
    try {
        const project = await projectModel.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        let projectImageUrl = project.projectImage;
        if (req.file) {
            projectImageUrl = `/projectImage/${req.file.filename}`;
        }

        const updatedProject = await projectModel.findByIdAndUpdate(
            req.params.id,
            { ...req.body, projectImage: projectImageUrl },
            { new: true }
        );

        res.status(200).json({ message: 'Project updated successfully', updatedProject });
    } catch (error) {
        res.status(500).json({ message: 'Error updating project' });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const project = await projectModel.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        const deletedProject = await projectModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Project deleted successfully', deletedProject });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting project' });
    }
};

export const getAllProject = async (req, res) => {
    try {
        const project = await projectModel.find();
        res.status(200).json({ message: 'All projects found', project });
    } catch (error) {
        res.status(500).json({ message: 'Error getting all projects' });
    }
};
