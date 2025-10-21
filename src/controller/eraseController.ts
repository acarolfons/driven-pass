import { NextFunction, Request, Response } from "express";
import { deleteAccount } from "../services/eraseService";

export async function eraseAccount(req: Request, res: Response, next: NextFunction){
    const userId = (req as any).user.userId
    await deleteAccount(userId)
    res.sendStatus(204)
}