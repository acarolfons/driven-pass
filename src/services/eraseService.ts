import { deleteCredentialsByUserId, deleteUserById, findUser } from "../repositories/eraseRepository"

export async function deleteAccount(userId: number){
    const user = await findUser(userId)
    if (!user) throw { type: 'Not Found', message: 'Usuário não encontrado!' };

    await deleteCredentialsByUserId(userId)
    await deleteUserById(userId)
}