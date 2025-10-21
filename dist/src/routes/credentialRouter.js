"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateSchemaMiddleware_1 = require("../middlewares/validateSchemaMiddleware");
const credentialSchema_1 = __importDefault(require("../schemas/credentialSchema"));
const credentialController_1 = require("../controller/credentialController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const credentialRouter = (0, express_1.Router)();
credentialRouter.post("/credentials", authMiddleware_1.default, (0, validateSchemaMiddleware_1.validateSchema)(credentialSchema_1.default), credentialController_1.createCredential);
credentialRouter.get("/credentials", authMiddleware_1.default, credentialController_1.getCredential);
credentialRouter.get("/credentials/:id", authMiddleware_1.default, credentialController_1.getCredentialUser);
credentialRouter.put("/credentials/:id", authMiddleware_1.default, credentialController_1.updateCredential);
credentialRouter.delete("/credentials/:id", authMiddleware_1.default, credentialController_1.deleteCredential);
exports.default = credentialRouter;
