import express from "express";
import cors from "cors";
import authRouter from "./Routers/auth.js";
import { mailer } from "./Mail/mailRouter.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/", authRouter);
app.use("/verify", mailer);

const port = 5000;

app.listen(port, () => {
  console.log("http://localhost:5000 up and running");
  //   console.log(Math.ceil(1000 + Math.random() * 9000));
});
