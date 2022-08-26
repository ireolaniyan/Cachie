import express from 'express';
import * as CachieContoller from '../controllers/cachie';
import * as CachieValidation from '../validations/cachie';

const router = express.Router();

router.post(
  "/search",
  CachieValidation.validateSearchCachie,
  CachieContoller.search,
);

router.get(
  "/analyse",
  CachieContoller.analyse,
)

export default router;