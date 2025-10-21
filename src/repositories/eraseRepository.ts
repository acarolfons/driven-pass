import prisma from "../database/db";

export async function findUser(userId: number){
    return  prisma.user.findUnique({
        where: {
            id: userId
        }
    })
}

export async function deleteCredentialsByUserId(userId: number) {
    return prisma.credential.deleteMany({
      where: { userId }
    });
}

export async function deleteUserById(userId: number) {
    return prisma.user.delete({
      where: { id: userId }
    });
}