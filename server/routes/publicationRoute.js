import express from 'express';
import { createPublication, getPublication, updatePublication, deletePublication, getAllPublication } from '../controllers/publicationController.js';
const route = express.Router();

route.post('/create', createPublication);
route.get('/', getAllPublication);
route.get('/:id', getPublication);
route.put('/:id', updatePublication);
route.delete('/:id', deletePublication);

export default route;
