
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../config";
import { generateToken } from "../utils/token";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, address, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ message: "Email already in use" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, address, password: hashed, role: (role || "USER") }
    });

    const token = generateToken({ id: user.id, role: user.role });
    return res.json({ token, user });
  } catch (e) {
    return res.status(500).json({ message: "Signup failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });
    const token = generateToken({ id: user.id, role: user.role });
    return res.json({ token, user });
  } catch {
    return res.status(500).json({ message: "Login failed" });
  }
};
