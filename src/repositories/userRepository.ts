import prisma from "../database/db";
import { UserData } from "../protocols/userProtocol";

export async function insertUser(newUser: UserData){
    const user = await prisma.user.create({ data: newUser })
    return user
}

export async function findUserByEmail(email: string){
    const existEmail = await prisma.user.findFirst({where: {email}})
    return existEmail
}
