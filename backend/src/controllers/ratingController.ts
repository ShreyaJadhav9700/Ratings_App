
import { Request, Response } from "express";
import { prisma } from "../config";

export const rateStore = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user as { id: number };
    const { storeId, value } = req.body as { storeId: number; value: number };
    if (!storeId || !value || value < 1 || value > 5) {
      return res.status(400).json({ message: "Invalid rating" });
    }
    const upserted = await prisma.rating.upsert({
      where: { userId_storeId: { userId: user.id, storeId } },
      update: { value },
      create: { userId: user.id, storeId, value }
    });
    return res.json(upserted);
  } catch {
    return res.status(500).json({ message: "Rating failed" });
  }
};
