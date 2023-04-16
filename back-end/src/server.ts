import express, { Request, Response } from "express";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import prisma from "./database";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

app.get("/add", async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: faker.name.fullName(),
        email: faker.internet.email()
      }
    });
    res.status(httpStatus.CREATED).send(user);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
});

app.get("/all", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({});
    res.send(users);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
})