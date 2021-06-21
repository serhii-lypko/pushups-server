import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import { coreRouter } from "./src/api-routers/core.js";
import { authRouter } from "./src/api-routers/auth.js";

/* - - - - - - - - - - - - - - - - - - - - - - */

// bars-push-up | push-up | pull-up

const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

dotenv.config();

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.options("*", cors());

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(process.env.DB_URL, connectionParams)
  .catch((err) => console.error(`Error connecting to the database. \n${err}`));

app.use("/api/auth", authRouter(router));
app.use("/api/core", coreRouter(router));

app.listen(process.env.PORT || 3000, function () {
  console.log("server running on port 3000", "");
});
