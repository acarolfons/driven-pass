import express, {json} from "express";
import dotenv from "dotenv";
dotenv.config()

const app = express();
app.use(json());

app.listen(process.env.PORT || 5000, () => console.log(`Server is up: port ${process.env.PORT}`))