import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchemaMiddleware";
import credentialSchema from "../schemas/credentialSchema";
import { createCredential, deleteCredential, getCredential, getCredentialUser, updateCredential } from "../controller/credentialController";
import tokenValidation from "../middlewares/authMiddleware";

const credentialRouter = Router()
credentialRouter.post("/credentials", tokenValidation, validateSchema(credentialSchema), createCredential)
credentialRouter.get("/credentials", tokenValidation, getCredential)
credentialRouter.get("/credentials/:id", tokenValidation, getCredentialUser)
credentialRouter.put("/credentials/:id", tokenValidation, updateCredential)
credentialRouter.delete("/credentials/:id", tokenValidation, deleteCredential)

export default credentialRouter