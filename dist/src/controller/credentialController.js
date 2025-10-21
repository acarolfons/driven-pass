"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCredential = createCredential;
exports.getCredential = getCredential;
exports.getCredentialUser = getCredentialUser;
exports.updateCredential = updateCredential;
exports.deleteCredential = deleteCredential;
const credentialService_1 = require("../services/credentialService");
async function createCredential(req, res, next) {
    const credentialData = req.body;
    const userId = req.user.userId;
    const credentialWithUser = {
        ...credentialData,
        userId,
    };
    try {
        await (0, credentialService_1.createNewCredential)(credentialWithUser);
        res.status(201).send("Credencial criada com sucesso!");
    }
    catch (err) {
        next(err);
    }
}
async function getCredential(req, res, next) {
    const userId = req.user.userId;
    try {
        const credentials = await (0, credentialService_1.getNewCredential)(userId);
        res.status(200).send(credentials);
    }
    catch (err) {
        next(err);
    }
}
async function getCredentialUser(req, res, next) {
    const userId = req.user.userId;
    const id = Number(req.params.id);
    try {
        const credential = await (0, credentialService_1.getCredentialById)(userId, id);
        res.status(200).send(credential);
    }
    catch (err) {
        next(err);
    }
}
async function updateCredential(req, res, next) {
    const credentialData = req.body;
    const userId = req.user.userId;
    const id = Number(req.params.id);
    try {
        await (0, credentialService_1.upCredential)(userId, id, credentialData);
        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
}
async function deleteCredential(req, res, next) {
    const userId = req.user.userId;
    const id = Number(req.params.id);
    try {
        await (0, credentialService_1.delCredential)(userId, id);
        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
}
