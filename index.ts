import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import routerV1 from "./src/routers/routerV1";
import { errorMiddleware } from "./src/middlewares/error.middleware";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/v1', routerV1);

app.get("/", (req: Request, res: Response) => {
  res.send("This is form server");
});
// app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});