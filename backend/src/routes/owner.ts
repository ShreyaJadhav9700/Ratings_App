
import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth";
import { dashboard } from "../controllers/ownerController";

const router = Router();
router.get("/dashboard", authenticate, authorize(["OWNER"]), dashboard);

export default router;
