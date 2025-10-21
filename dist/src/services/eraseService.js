"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccount = deleteAccount;
const eraseRepository_1 = require("../repositories/eraseRepository");
async function deleteAccount(userId) {
    const user = await (0, eraseRepository_1.findUser)(userId);
    if (!user)
        throw { type: 'Not Found', message: 'Usuário não encontrado!' };
    await (0, eraseRepository_1.deleteCredentialsByUserId)(userId);
    await (0, eraseRepository_1.deleteUserById)(userId);
}
