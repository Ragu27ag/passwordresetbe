import express from "express";
import bcrypt from "bcrypt";
import { addEntity, findEntity, updateEntity } from "../db/db-utlis.js";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const data = req.body;
  console.log(data);
  const pass = data.password;
  await bcrypt.hash(pass, 10, async (err, hashed) => {
    if (err) {
      console.log(err);
    } else {
      console.log(hashed);
      data.password = hashed;
      await addEntity("users", data);
      res.send("Inserted successfully");
    }
  });
});

authRouter.post("/login", async (req, res) => {
  const data = req.body;
  console.log(data);
  const dbdata = await findEntity("users", data.email);
  const pass = dbdata.password;
  let at = "";
  await bcrypt.compare(data.password, pass, async (err, result) => {
    if (result) {
      jwt.sign(dbdata.email, process.env.JWT_SECRET_LOG, (err, token) => {
        console.log(token);
        at = token;
        res.send({ msg: "loged in successfully", tok: at });
      });
    } else {
      res.send("Invalid Credentials");
    }
  });
});

authRouter.post("/reset", async (req, res) => {
  const data = req.body;
  console.log(data);
  const dbdata = await findEntity("users", data.email);
  console.log(dbdata);
  const passdata = data.pass;
  await bcrypt.hash(passdata, 10, async (err, hashed) => {
    if (err) {
      console.log(err);
    } else {
      console.log(hashed);
      dbdata.password = hashed;
      await updateEntity("users", dbdata);
      res.send("updated successfully");
    }
  });
});

export default authRouter;
