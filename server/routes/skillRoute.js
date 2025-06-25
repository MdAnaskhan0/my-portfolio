import express from 'express';
import { createSkill, getSkill, updateSkill, deleteSkill, getAllSkill } from '../controllers/skillController.js';
const route = express.Router();

route.post('/create', createSkill);
route.get('/', getAllSkill);
route.get('/:id', getSkill);
route.put('/:id', updateSkill);
route.delete('/:id', deleteSkill);

export default route;