import { NextFunction, Request, Response } from "express";
import { CredentialData } from "../protocols/credentialProtocol";
import { createNewCredential, delCredential, getCredentialById, getNewCredential, upCredential } from "../services/credentialService";

export async function createCredential(req: Request, res: Response, next: NextFunction){
    const credentialData: CredentialData = req.body;
    const userId = (req as any).user.userId;
    const credentialWithUser: CredentialData = {
        ...credentialData,
        userId,
    };
    try{
    await createNewCredential(credentialWithUser)
    res.status(201).send("Credencial criada com sucesso!")
    }catch(err){
        next(err)
    }
}

export async function getCredential(req: Request, res: Response, next: NextFunction){
    const userId = (req as any).user.userId;
    try{
        const credentials = await getNewCredential(userId)
        res.status(200).send(credentials);
    }catch(err){
        next(err)
    }
}

export async function getCredentialUser(req: Request, res: Response, next: NextFunction){
    const userId = (req as any).user.userId;
    const id = Number(req.params.id);
    try{
        const credential = await getCredentialById(userId, id)
        res.status(200).send(credential)
    }catch(err){
        next(err)
    } 
}

export async function updateCredential(req: Request, res: Response, next: NextFunction){
    const credentialData: CredentialData = req.body;
    const userId = (req as any).user.userId;
    const id = Number(req.params.id);
    try{
        await upCredential(userId, id, credentialData)
        res.sendStatus(204)
    }catch(err){
        next(err)
    }
}

export async function deleteCredential(req: Request, res: Response, next: NextFunction){
    const userId = (req as any).user.userId;
    const id = Number(req.params.id);
    try{
        await delCredential(userId, id)
        res.sendStatus(204)
    }catch(err){
        next(err)
    }
}