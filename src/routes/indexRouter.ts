import { Router, Request, Response } from "express";
import userRouter from "./userRouter";
import tokenValidation from "../middlewares/authMiddleware";
import credentialRouter from "./credentialRouter";
const router = Router()

router.get("/health", (req: Request, res:Response) => res.status(200).send("OK!"))
router.use(userRouter)
router.use(credentialRouter)

export default router