import express from 'express';
import { handleGenerateNotes } from '../controllers/generate.controller.js';

const router = express.Router();

router.post('/generate', handleGenerateNotes);

export default router;
