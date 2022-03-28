import { Router } from "express";
const router = Router();
import {createConnectionHandler, getTablesHandler, getDataHandler} from "../controllers/data";

router.post("/create-connection", createConnectionHandler);

router.get("/tables", getTablesHandler);

router.get("/table/:table_name", getDataHandler);

export default router;