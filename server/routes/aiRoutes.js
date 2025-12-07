import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { enhanceJobDescripition, enhanceProfessionalSummary, uploadResume } from "../controllers/aiController.js";



const aiRouter = express.Router();

aiRouter.post('/enchance-pro-sum', protect, enhanceProfessionalSummary)
aiRouter.post('/enchance-job-desc', protect, enhanceJobDescripition)
aiRouter.post('/upload-resume', protect, uploadResume)

export default aiRouter