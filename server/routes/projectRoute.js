import express from 'express';
import multer from 'multer';
import { createProject, getProject, updateProject, deleteProject, getAllProject } from '../controllers/projectController.js';

const route = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'projectImage');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = file.originalname.split('.').pop();
        cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
    }
});

const upload = multer({ storage });

route.post('/create', upload.single('projectImage'), createProject);
route.get('/', getAllProject);
route.get('/:id', getProject);
route.put('/:id', upload.single('projectImage'), updateProject);
route.delete('/:id', deleteProject);

export default route;
