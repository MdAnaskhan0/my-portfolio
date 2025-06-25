import express from 'express';
import { createExperience, getExperience, updateExperience, deleteExperience, getAllExperience } from '../controllers/experienceController.js';
const route = express.Router();

route.post('/create', createExperience);
route.get('/', getAllExperience);
route.get('/:id', getExperience);
route.put('/:id', updateExperience);
route.delete('/:id', deleteExperience);

export default route;