import prisma from "../database/db";
import { CredentialData } from "../protocols/credentialProtocol";

export async function insertCredential(newCredential: CredentialData) {
   await prisma.credential.create({ data: newCredential});
   return
}

export async function findUserTitle(title:string, userId:number){
   const exist = await prisma.credential.findFirst({
      where:{
         title: title,
         userId: userId
      }
   })
   return exist
}

export async function findAllCredentialsByUser(userId: number){
   return prisma.credential.findMany({
      where: { userId },
   })
}

export async function findCredentialByIdAndUser(userId: number, id: number){
   return prisma.credential.findFirst({
      where: {userId, id}
   })
}

export async function upNewCredential(id: number, credentialUpdated: CredentialData){
   return await prisma.credential.update({
      where: { id },
      data: credentialUpdated,
   });
}

export async function deleteCredentialById(userId: number, id: number){
   const credential = await findCredentialByIdAndUser( userId, id );
   if (!credential) throw { type: 'Not Found', message: 'Credencial não encontrada!' };
 
   await prisma.credential.delete({ where: { id } });
}