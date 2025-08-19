
import { Request, Response } from "express";
import { prisma } from "../config";

export const dashboard = async (req: Request, res: Response) => {
  const user = (req as any).user as { id: number };
  const store = await prisma.store.findFirst({ where: { ownerId: user.id } });
  if (!store) return res.json({ store: null, averageRating: null, raters: [] });

  const avgAgg = await prisma.rating.aggregate({
    where: { storeId: store.id },
    _avg: { value: true }
  });

  const raters = await prisma.rating.findMany({
    where: { storeId: store.id },
    include: { user: true },
    orderBy: { createdAt: "desc" }
  });

  const mapped = raters.map((r) => ({
    id: r.id,
    value: r.value,
    name: r.user.name,
    email: r.user.email
  }));

  return res.json({
    store: { id: store.id, name: store.name, address: store.address },
    averageRating: avgAgg._avg.value,
    raters: mapped
  });
};
