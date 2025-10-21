import { Router, Request, Response } from "express";
import userRouter from "./userRouter";
import tokenValidation from "../middlewares/authMiddleware";
const router = Router()

router.get("/health", (req: Request, res:Response) => res.status(200).send("OK!"))
router.use(userRouter)

export default router