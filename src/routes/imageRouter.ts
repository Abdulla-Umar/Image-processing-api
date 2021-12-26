import express from 'express';

import { isExist } from '../controllers/imageController.js';

const router = express.Router();

router.get('/images', isExist);

export { router };
