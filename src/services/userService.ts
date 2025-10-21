import { UserData, UserInput, UserLogin } from "../protocols/userProtocol";
import bcrypt from "bcrypt";
import { findUserByEmail, insertUser } from "../repositories/userRepository";
import jwt from "jsonwebtoken"
const hash = 10;

export async function createNewUser(user: UserInput){
    const existEmail = await findUserByEmail(user.email)
    if(existEmail) throw {type: 'Conflict', message: 'Email já cadastrado, tente outro!'}
    const password = user.password
    const confirmPassword = user.confirmPassword
    if(password !== confirmPassword ) throw {type: 'Unprocessable Entity', message: 'Senhas não coincidem!'}

    const hashedPassword = await bcrypt.hash(password,hash)
    const newUser: UserData = {
        name: user.name,
        email: user.email,
        password: hashedPassword
    }
    await insertUser(newUser)
    return newUser
}

export async function userLogin(user: UserLogin){
    const findUser = await findUserByEmail(user.email)
    if(!findUser) throw {type: 'Not Found', message: 'Usuário não encontrado!'}
    const isPasswordCorrect = await bcrypt.compare(user.password, findUser.password)
    if(!isPasswordCorrect) throw {type: 'Unauthorized', message: 'Senha incorreta!'}

    const token = jwt.sign(
        { userId: findUser.id },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
      )
    return token
    
}