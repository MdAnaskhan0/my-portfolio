import express from 'express';
import { createProjectCategory, getProjectCategory, updateProjectCategory, deleteProjectCategory, getAllProjectCategory } from '../controllers/projectCategoryController.js';
const route = express.Router();

route.post('/create', createProjectCategory);
route.get('/', getAllProjectCategory);
route.get('/:id', getProjectCategory);
route.put('/:id', updateProjectCategory);
route.delete('/:id', deleteProjectCategory);    

export default route;