"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter_1 = __importDefault(require("./userRouter"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const credentialRouter_1 = __importDefault(require("./credentialRouter"));
const eraseController_1 = require("../controller/eraseController");
const router = (0, express_1.Router)();
router.get("/health", (req, res) => res.status(200).send("OK!"));
router.use(userRouter_1.default);
router.use(credentialRouter_1.default);
router.delete("/erase", authMiddleware_1.default, eraseController_1.eraseAccount);
exports.default = router;
