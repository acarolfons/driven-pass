"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertCredential = insertCredential;
exports.findUserTitle = findUserTitle;
exports.findAllCredentialsByUser = findAllCredentialsByUser;
exports.findCredentialByIdAndUser = findCredentialByIdAndUser;
exports.upNewCredential = upNewCredential;
exports.deleteCredentialById = deleteCredentialById;
const db_1 = __importDefault(require("../database/db"));
async function insertCredential(newCredential) {
    await db_1.default.credential.create({ data: newCredential });
    return;
}
async function findUserTitle(title, userId) {
    const exist = await db_1.default.credential.findFirst({
        where: {
            title: title,
            userId: userId
        }
    });
    return exist;
}
async function findAllCredentialsByUser(userId) {
    return db_1.default.credential.findMany({
        where: { userId },
    });
}
async function findCredentialByIdAndUser(userId, id) {
    return db_1.default.credential.findFirst({
        where: { userId, id }
    });
}
async function upNewCredential(id, credentialUpdated) {
    return await db_1.default.credential.update({
        where: { id },
        data: credentialUpdated,
    });
}
async function deleteCredentialById(userId, id) {
    const credential = await findCredentialByIdAndUser(userId, id);
    if (!credential)
        throw { type: 'Not Found', message: 'Credencial não encontrada!' };
    await db_1.default.credential.delete({ where: { id } });
}
