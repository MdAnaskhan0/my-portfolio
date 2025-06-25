import express from 'express';
import { createSocialMedia, getSocialMedia, updateSocialMedia, deleteSocialMedia, getAllSocialMedia } from '../controllers/socialMediaController.js';
const route = express.Router();

route.post('/create', createSocialMedia);
route.get('/', getAllSocialMedia);
route.get('/:id', getSocialMedia);
route.put('/:id', updateSocialMedia);
route.delete('/:id', deleteSocialMedia);

export default route;