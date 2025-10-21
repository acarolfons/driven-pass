"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUser = findUser;
exports.deleteCredentialsByUserId = deleteCredentialsByUserId;
exports.deleteUserById = deleteUserById;
const db_1 = __importDefault(require("../database/db"));
async function findUser(userId) {
    return db_1.default.user.findUnique({
        where: {
            id: userId
        }
    });
}
async function deleteCredentialsByUserId(userId) {
    return db_1.default.credential.deleteMany({
        where: { userId }
    });
}
async function deleteUserById(userId) {
    return db_1.default.user.delete({
        where: { id: userId }
    });
}
