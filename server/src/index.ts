import express from "express";
const app = express();
require("dotenv").config();
import bodyParser from "body-parser";
import cors from "cors";

import dataRoute from "./routes/data";

app.use(cors());
app.use(bodyParser.json());

app.use("/api", dataRoute);

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));