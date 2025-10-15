import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";

dotenv.config();

const secret = process.env.JWT_SECRET;
if (!secret) throw new Error("JWT_SECRET não definido");

function tokenValidation(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, secret as string);
    (req as any).user = decoded
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token inválido" });
  }
}

export default tokenValidation;
