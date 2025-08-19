
import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { rateStore } from "../controllers/ratingController";

const router = Router();
router.post("/", authenticate, rateStore);

export default router;
