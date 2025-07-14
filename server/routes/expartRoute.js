import express from 'express';
import { createExpert, getExpert, updateExpert, deleteExpert, getAllExpert } from '../controllers/expartController.js';
const expartRoute = express.Router();

expartRoute.post('/create', createExpert);
expartRoute.get('/', getAllExpert);
expartRoute.get('/:id', getExpert);
expartRoute.put('/:id', updateExpert);  
expartRoute.delete('/:id', deleteExpert);

export default expartRoute;