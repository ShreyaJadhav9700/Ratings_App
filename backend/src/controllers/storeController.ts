
import { Request, Response } from "express";
import { prisma } from "../config";

export const listStores = async (req: Request, res: Response) => {
  const user = (req as any).user as { id: number };
  const { qName, qAddress } = req.query as { qName?: string; qAddress?: string };

  const where: any = {};
  if (qName) where.name = { contains: qName as string, mode: "insensitive" };
  if (qAddress) where.address = { contains: qAddress as string, mode: "insensitive" };

  const stores = await prisma.store.findMany({
    where,
    include: { ratings: true }
  });

  // decorate with overallRating + myRating
  const decorated = await Promise.all(
    stores.map(async (s) => {
      const avg = await prisma.rating.aggregate({
        where: { storeId: s.id },
        _avg: { value: true }
      });
      const mine = await prisma.rating.findUnique({
        where: { userId_storeId: { userId: user.id, storeId: s.id } }
      });
      return {
        id: s.id,
        name: s.name,
        address: s.address,
        overallRating: avg._avg.value,
        myRating: mine?.value ?? null
      };
    })
  );

  return res.json(decorated);
};

export const createStore = async (req: Request, res: Response) => {
  try {
    const { name, address, ownerId } = req.body;
    const store = await prisma.store.create({ data: { name, address, ownerId } });
    return res.json(store);
  } catch {
    return res.status(500).json({ message: "Create store failed" });
  }
};
