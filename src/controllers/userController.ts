import { Request, Response, NextFunction } from "express";
import { createNewUser } from "../services/userService";
import { UserInput } from "../protocols/userProtocol";

export async function createUser(req: Request, res: Response, next: NextFunction){
    const user: UserInput = req.body
    try {
        await createNewUser(user)
        res.status(201).send("Usuário criado com sucesso!")
      } catch (error) {
        res.status(409).send(error)
      }
}