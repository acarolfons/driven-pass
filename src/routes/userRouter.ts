import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchemaMiddleware";
import { userSchema, loginSchema } from "../schemas/userSchema";
import { createUser, loginUser } from "../controller/useController";

const userRouter = Router()

userRouter.post("/sign-up", validateSchema(userSchema), createUser)
userRouter.post("/sign-in", validateSchema(loginSchema), loginUser)

export default userRouter