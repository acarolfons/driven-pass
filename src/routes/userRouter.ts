import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchemaMiddlware";
import userSchema from "../schemas/userSchema";
import { createUser } from "../controllers/userController";

const userRouter = Router()

userRouter.post("/sign-up", validateSchema(userSchema), createUser)

export default userRouter