"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewUser = createNewUser;
exports.userLogin = userLogin;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRepository_1 = require("../repositories/userRepository");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const hash = 10;
async function createNewUser(user) {
    const existEmail = await (0, userRepository_1.findUserByEmail)(user.email);
    if (existEmail)
        throw { type: 'Conflict', message: 'Email já cadastrado, tente outro!' };
    const password = user.password;
    const confirmPassword = user.confirmPassword;
    if (password !== confirmPassword)
        throw { type: 'Unprocessable Entity', message: 'Senhas não coincidem!' };
    const hashedPassword = await bcrypt_1.default.hash(password, hash);
    const newUser = {
        name: user.name,
        email: user.email,
        password: hashedPassword
    };
    await (0, userRepository_1.insertUser)(newUser);
    return newUser;
}
async function userLogin(user) {
    const findUser = await (0, userRepository_1.findUserByEmail)(user.email);
    if (!findUser)
        throw { type: 'Not Found', message: 'Usuário não encontrado!' };
    const isPasswordCorrect = await bcrypt_1.default.compare(user.password, findUser.password);
    if (!isPasswordCorrect)
        throw { type: 'Unauthorized', message: 'Senha incorreta!' };
    const token = jsonwebtoken_1.default.sign({ userId: findUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}
