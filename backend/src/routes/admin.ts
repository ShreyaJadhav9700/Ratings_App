
import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth";
import { allStores, metrics } from "../controllers/adminController";

const router = Router();
router.get("/stores", authenticate, authorize(["ADMIN"]), allStores);
router.get("/metrics", authenticate, authorize(["ADMIN"]), metrics);

export default router;
