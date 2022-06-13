import { Router } from "express";
const router = Router();
import {
    getDatabasesHandler,
    selectDatabaseHandler,
    getTablesHandler,
    getDataHandler,
} from "../controllers/mysql";

router.get("/databases", getDatabasesHandler);

router.post("/databases/select", selectDatabaseHandler);

router.get("/tables", getTablesHandler);

router.get("/tables/:table_name", getDataHandler);

export default router;
