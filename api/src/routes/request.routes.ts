import { Router } from 'express';
import { handleRequest } from '../controllers/request.controller';

const router = Router();

router.post('/', handleRequest);

export default router;