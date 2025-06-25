import express from 'express';
import { createUser, getUser, updateUser, deleteUser, getAllUsers } from '../controllers/userController.js';

const route = express.Router();

route.post('/create', createUser);
route.get('/', getAllUsers);
route.get('/:id', getUser);
route.put('/:id', updateUser);
route.delete('/:id', deleteUser);

export default route;
