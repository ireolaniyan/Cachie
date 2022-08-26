import express from 'express';
import * as CachieContoller from '../controllers/cachie';
import * as CachieValidation from '../validations/cachie';

const router = express.Router();

router.post(
  "/search",
  CachieValidation.validateSearchCachie,
  CachieContoller.search
);

export default router;