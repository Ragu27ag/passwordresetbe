import express from "express";
import nodemailer from "nodemailer";
import { addEntity, deleteEntity, findEntity } from "../db/db-utlis.js";
import jwt from "jsonwebtoken";

const mailer = express.Router();

const sentMail = (details) => {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    var mail_option = {
      from: process.env.USER,
      to: details.email,
      subject: "Verification",
      text: `OTP : ${details.verotp}`,
    };

    transporter.sendMail(mail_option, function (err, info) {
      if (err) {
        return reject({ mag: "rejected" });
      } else {
        return resolve({ masg: "email sent" });
      }
    });
  });
};

mailer.post("/", async (req, res) => {
  const obj = req.body;
  const otp = Math.ceil(1000 + Math.random() * 9000);
  const verobj = {
    email: obj.mail,
    verotp: otp,
  };
  console.log(obj.mail, otp, verobj);
  const mailres = await sentMail(verobj);
  const del = await deleteEntity("verify", obj.mail);
  console.log(del);
  if (del) {
    let tokver = "";
    const con = await addEntity("verify", verobj);
    console.log(con, mailres);
    jwt.sign(obj.mail, process.env.JWT_SECRET_VER, (err, token) => {
      tokver = token;
      res.send({ msg: "check", vertok: tokver });
    });
  }
});

mailer.post("/comp", async (req, res) => {
  const data = req.body;
  console.log(data);
  const otpdb = await findEntity("verify", data.email);
  console.log("otp", otpdb);
  if (Number(data.otp) === otpdb.verotp) {
    res.send("done");
  } else {
    res.send("error");
  }
});

export { mailer };
