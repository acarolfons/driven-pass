import express, {json} from "express";
import dotenv from "dotenv";
import router from "./routes/indexRouter";
import { errorHandlerMiddleware } from "./middlewares/errorHandleMiddlware";
dotenv.config()

const app = express();
app.use(json());
app.use(router)

app.use(errorHandlerMiddleware)
app.listen(process.env.PORT || 5000, () => console.log(`Server is up: port ${process.env.PORT}`))