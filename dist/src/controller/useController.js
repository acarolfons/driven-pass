"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.loginUser = loginUser;
const userService_1 = require("../services/userService");
async function createUser(req, res, next) {
    const user = req.body;
    try {
        await (0, userService_1.createNewUser)(user);
        res.status(201).send("Usuário criado com sucesso!");
    }
    catch (error) {
        next(error);
    }
}
async function loginUser(req, res, next) {
    const user = req.body;
    try {
        const token = await (0, userService_1.userLogin)(user);
        res.status(200).json({ token });
    }
    catch (error) {
        next(error);
    }
}
