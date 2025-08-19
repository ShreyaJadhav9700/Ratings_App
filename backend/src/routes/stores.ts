
import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth";
import { listStores, createStore } from "../controllers/storeController";

const router = Router();
router.get("/", authenticate, listStores);
router.post("/", authenticate, authorize(["ADMIN", "OWNER"]), createStore);

export default router;
