"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eraseAccount = eraseAccount;
const eraseService_1 = require("../services/eraseService");
async function eraseAccount(req, res, next) {
    const userId = req.user.userId;
    await (0, eraseService_1.deleteAccount)(userId);
    res.sendStatus(204);
}
