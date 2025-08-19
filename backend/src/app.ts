
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import storeRoutes from "./routes/stores";
import ratingRoutes from "./routes/ratings";
import adminRoutes from "./routes/admin";
import ownerRoutes from "./routes/owner";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => res.json({ status: "ok" }));

app.use("/auth", authRoutes);
app.use("/stores", storeRoutes);
app.use("/ratings", ratingRoutes);
app.use("/admin", adminRoutes);
app.use("/owner", ownerRoutes);

export default app;
