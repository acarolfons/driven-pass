"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertUser = insertUser;
exports.findUserByEmail = findUserByEmail;
const db_1 = __importDefault(require("../database/db"));
async function insertUser(newUser) {
    const user = await db_1.default.user.create({ data: newUser });
    return user;
}
async function findUserByEmail(email) {
    const existEmail = await db_1.default.user.findFirst({ where: { email } });
    return existEmail;
}
