import express from 'express';
import * as CachieContoller from '../controllers/cachie';

const router = express.Router();

router.post('/search', CachieContoller.search);

export default router;