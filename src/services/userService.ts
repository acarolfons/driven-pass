import { UserData, UserInput } from "../protocols/userProtocol";
import bcrypt from "bcrypt";
import { findUserByEmail, insertUser } from "../repositories/userRepository";

const hash = 10;

export async function createNewUser(user: UserInput){
    const existEmail = await findUserByEmail(user.email)
    if(existEmail) throw {type: 'Conflict', message: 'Email já cadastrado, tente outro!'}
    if(user.password !== user.confirmPassword ) throw {type: 'Unprocessable Entity', message: 'Senhas não coincidem!'}

    const hashedPassword = await bcrypt.hash(user.password,hash)
    const newUser: UserData = {
        name: user.name,
        email: user.email,
        password: hashedPassword
    }
    await insertUser(newUser)
    return newUser
}