import express from 'express'
import apiController from './../controllers/apiController.js'

const router = express.Router();

router.get("/api", apiController.apiNoAuth);
router.get("/api/auth", apiController.apiAuth);

export default router