
import { Request, Response } from "express";
import { prisma } from "../config";

export const allStores = async (_req: Request, res: Response) => {
  const stores = await prisma.store.findMany();
  const withAvg = await Promise.all(
    stores.map(async (s) => {
      const avg = await prisma.rating.aggregate({
        where: { storeId: s.id },
        _avg: { value: true }
      });
      return { ...s, overallRating: avg._avg.value };
    })
  );
  res.json(withAvg);
};

export const metrics = async (_req: Request, res: Response) => {
  const [restaurants, users, reviews] = await Promise.all([
    prisma.store.count(),
    prisma.user.count(),
    prisma.rating.count()
  ]);

  const avgAgg = await prisma.rating.aggregate({ _avg: { value: true } });
  res.json({
    totalRestaurants: restaurants,
    totalUsers: users,
    totalReviews: reviews,
    averageRating: avgAgg._avg.value
  });
};
