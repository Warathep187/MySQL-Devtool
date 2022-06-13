import express from "express";
const app = express();
require("dotenv").config();
import bodyParser from "body-parser";
import cors from "cors";

import dataRoute from "./routes/mysql";
import { connectToMysql } from "./services/mysql-connection";

app.use(cors());
app.use(bodyParser.json());

app.use("/api/mysql", dataRoute);

app.listen(process.env.PORT, async () => {
    await connectToMysql()
    console.log(`Mysql devtool server is running on port ${process.env.PORT}`)
});