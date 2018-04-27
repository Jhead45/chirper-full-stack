import { Router } from 'express';
import chirpsRouter from './chirp';

let router = Router();

router.use('/chirps', chirpsRouter);

export default router;


