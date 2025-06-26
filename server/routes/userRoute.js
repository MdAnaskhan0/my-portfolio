import express from 'express';
import { createUser, getUser, updateUser, deleteUser, getAllUsers } from '../controllers/userController.js';
import upload from '../utils/multerConfig.js';

const route = express.Router();

route.post('/create', upload.single('profilepicture'), createUser);
route.get('/', getAllUsers);
route.get('/:id', getUser);
route.put('/:id', upload.single('profilePicture'), updateUser);
route.delete('/:id', deleteUser);

export default route;
