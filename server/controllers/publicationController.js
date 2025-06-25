import PublicationModel from '../models/publicationModel.js';

export const createPublication = async (req, res) => {
    try {
        const publicationData = new Publication(req.body);
        const { title, authorname, publishdate, publicationname, link, description } = publicationData;

        const publicationExists = await Publication.findOne({ title });

        if (publicationExists) {
            return res.status(400).json({ message: 'Publication already exists' });
        }

        const savedPublication = await publicationData.save();
        res.status(201).json({ message: 'Publication created successfully', savedPublication });
    } catch (error) {
        res.status(500).json({ message: 'Error creating publication' });
    }
};

export const getPublication = async (req, res) => {
    try {
        const publication = await Publication.findById(req.params.id);
        if (!publication) {
            return res.status(404).json({ message: 'Publication not found' });
        }
        res.status(200).json({ message: 'Publication found', publication });
    } catch (error) {
        res.status(500).json({ message: 'Error getting publication' });
    }
};

export const updatePublication = async (req, res) => {
    try {
        const publication = await Publication.findById(req.params.id);
        if (!publication) {
            return res.status(404).json({ message: 'Publication not found' });
        }
        const updatedPublication = await Publication.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'Publication updated successfully', updatedPublication });
    } catch (error) {
        res.status(500).json({ message: 'Error updating publication' });
    }
};

export const deletePublication = async (req, res) => {
    try {
        const publication = await Publication.findById(req.params.id);
        if (!publication) {
            return res.status(404).json({ message: 'Publication not found' });
        }
        const deletedPublication = await Publication.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Publication deleted successfully', deletedPublication });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting publication' });
    }
};

export const getAllPublication = async (req, res) => {
    try {
        const publication = await Publication.find();
        res.status(200).json({ message: 'All publication found', publication });
    } catch (error) {
        res.status(500).json({ message: 'Error getting all publication' });
    }
};      