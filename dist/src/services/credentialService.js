"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewCredential = createNewCredential;
exports.getNewCredential = getNewCredential;
exports.getCredentialById = getCredentialById;
exports.upCredential = upCredential;
exports.delCredential = delCredential;
const credentialRepository_1 = require("../repositories/credentialRepository");
const cryptr_1 = __importDefault(require("cryptr"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.CRYPTR_SECRET;
if (!secret)
    throw new Error("CRYPTR_SECRET não definido nas variáveis de ambiente");
const cryptr = new cryptr_1.default(secret);
async function createNewCredential(credentialData) {
    const titleExist = await (0, credentialRepository_1.findUserTitle)(credentialData.title, credentialData.userId);
    if (titleExist)
        throw { type: 'Conflict', message: `Você já tem uma credencial com esse título!` };
    const password = credentialData.password;
    const hashedPassword = cryptr.encrypt(password);
    const newCredential = {
        title: credentialData.title,
        userId: credentialData.userId,
        url: credentialData.url,
        username: credentialData.username,
        password: hashedPassword
    };
    await (0, credentialRepository_1.insertCredential)(newCredential);
    return newCredential;
}
async function getNewCredential(userId) {
    const credentials = await (0, credentialRepository_1.findAllCredentialsByUser)(userId);
    const decrypted = credentials.map((credential) => ({
        ...credential,
        password: cryptr.decrypt(credential.password),
    }));
    return decrypted;
}
async function getCredentialById(userId, id) {
    const credential = await (0, credentialRepository_1.findCredentialByIdAndUser)(userId, id);
    if (!credential)
        throw { type: 'Not Found', message: "credencial não encontrada!" };
    const decrypted = {
        ...credential,
        password: cryptr.decrypt(credential.password),
    };
    return decrypted;
}
async function upCredential(userId, id, credentialData) {
    const credential = await (0, credentialRepository_1.findCredentialByIdAndUser)(userId, id);
    if (!credential)
        throw { type: 'Not Found', message: 'Credencial não encontrada!' };
    const credentialWithTitle = await (0, credentialRepository_1.findUserTitle)(credentialData.title, userId);
    if (credentialWithTitle && credentialWithTitle.id !== id)
        throw { type: 'Conflict', message: 'Você já tem uma credencial com esse título!' };
    const hashedPassword = cryptr.encrypt(credentialData.password);
    const credentialUpdated = {
        title: credentialData.title,
        url: credentialData.url,
        username: credentialData.username,
        password: hashedPassword,
        userId
    };
    const newCredential = await (0, credentialRepository_1.upNewCredential)(id, credentialUpdated);
    return newCredential;
}
async function delCredential(userId, id) {
    const credential = await (0, credentialRepository_1.deleteCredentialById)(userId, id);
    return credential;
}
