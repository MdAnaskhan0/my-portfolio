import express from 'express';
import { createEducation, getEducation, updateEducation, deleteEducation, getAllEducation } from '../controllers/educationController.js';
const route = express.Router();

route.post('/create', createEducation);
route.get('/', getAllEducation);
route.get('/:id', getEducation);
route.put('/:id', updateEducation);
route.delete('/:id', deleteEducation);

export default route;