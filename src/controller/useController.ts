import { NextFunction, Request, Response } from "express";
import { createNewUser, userLogin } from "../services/userService";
import { UserInput, UserLogin } from "../protocols/userProtocol"

export async function createUser(req: Request, res: Response, next: NextFunction){
    const user: UserInput = req.body
    try {
        await createNewUser(user)
        res.status(201).send("Usuário criado com sucesso!")
      } catch (error) {
        next(error)
      }
}

export async function loginUser(req: Request, res: Response, next: NextFunction){
    const user: UserLogin = req.body
    try{
        const token = await userLogin(user)
        res.status(200).json({token})
    }catch(error){
        next(error)
    }
}