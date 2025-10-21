import { CredentialData } from "../protocols/credentialProtocol";
import { deleteCredentialById, findAllCredentialsByUser, findCredentialByIdAndUser, findUserTitle, insertCredential, upNewCredential } from "../repositories/credentialRepository";
import Cryptr from "cryptr";
import dotenv from "dotenv";
dotenv.config()
const secret = process.env.CRYPTR_SECRET
if(!secret) throw new Error("CRYPTR_SECRET não definido nas variáveis de ambiente");
const cryptr = new Cryptr(secret)

export async function createNewCredential(credentialData: CredentialData){
    const titleExist = await findUserTitle(credentialData.title, credentialData.userId)
    if(titleExist) throw {type: 'Conflict', message: `Você já tem uma credencial com esse título!`}

    const password = credentialData.password
    const hashedPassword = cryptr.encrypt(password)
    const newCredential = {
        title: credentialData.title,
        userId: credentialData.userId,
        url: credentialData.url,
        username: credentialData.username,
        password: hashedPassword
    }
    await insertCredential(newCredential)
    return newCredential
}

export async function getNewCredential(userId: number){
    const credentials = await findAllCredentialsByUser(userId);
    const decrypted = credentials.map((credential:CredentialData) => ({
    ...credential,
    password: cryptr.decrypt(credential.password),
  }));

  return decrypted;
}

export async function getCredentialById(userId: number, id: number){
    const credential = await findCredentialByIdAndUser(userId, id)
    if (!credential) throw {type: 'Not Found', message: "credencial não encontrada!"}

    const decrypted = {
        ...credential,
        password: cryptr.decrypt(credential.password),
      };

    return decrypted
}

export async function upCredential( userId:number, id: number, credentialData: CredentialData){
  const credential = await findCredentialByIdAndUser(userId, id)
  if (!credential) throw { type: 'Not Found', message: 'Credencial não encontrada!' }

  const credentialWithTitle = await findUserTitle(credentialData.title, userId);
  if (credentialWithTitle && credentialWithTitle.id !== id) throw { type: 'Conflict', message: 'Você já tem uma credencial com esse título!' };

  const hashedPassword = cryptr.encrypt(credentialData.password);
  const credentialUpdated = {
    title: credentialData.title,
    url: credentialData.url,
    username: credentialData.username,
    password: hashedPassword,
    userId
  };

  const newCredential = await upNewCredential(id, credentialUpdated)
  return newCredential
}

export async function delCredential(userId: number, id: number){
  const credential = await deleteCredentialById(userId, id)
  return credential
}