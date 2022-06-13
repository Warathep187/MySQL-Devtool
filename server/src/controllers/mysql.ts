import { Request, Response } from "express";
import { Table } from "../types/table";
import { connection } from "../services/mysql-connection";


export const getDatabasesHandler = async (_req: Request, res: Response) => {
    try {
        const databases = await connection.query("SHOW DATABASES");
        res.send({
            databases
        })
    }catch(e) {
        res.status(500).send({
            message: "Something went wrong"
        })
    }
}

export const selectDatabaseHandler = async (req: Request, res: Response) => {
    try {
        const {database} = req.body as {database: string;};
        if(!database || database.trim() === "") {
            return res.status(400).send({
                message: "Please select database"
            })
        }
        await connection.query(`USE ${database}`);
        res.send({
            message: "Selected"
        })
    }catch(e) {
        res.status(500).send({
            message: "Something went wrong"
        })
    }
}

export const getTablesHandler = async (_req: Request, res: Response) => {
    try {
        const tables = await connection.query(`SHOW TABLES`) as unknown as Table[] ;
        res.status(200).send({
            tables,
        });
    } catch (e) {
        res.status(500).send({
            message: "Something went wrong",
        });
    }
};

export const getDataHandler = async (req: Request, res: Response) => {
    try {
        const {table_name} = req.params as {table_name: string}
        const data = await connection.query(`SELECT * FROM ${table_name}`) as unknown as [];
        const desc = await connection.query(`DESC ${table_name}`);
        res.status(200).send({
            desc,
            data,
            data_length: data.length
        })
    }catch(e) {
        res.status(500).send({
            message: "Something went wrong",
        })
    }
}

export const updateDataHandler = async (req: Request, res: Response) => {
    try {
        const {table_name} = req.params;
        const data = req.body.data;
        const columns = Object.keys(data);
        const values = Object.values(data);
        const query = `
            UPDATE ${table_name} SET ' ${columns.join("' = ? ,'")} ' = ? WHERE ${columns[0]} = ${values[0]}
        `
        await connection.query(query, values);
        res.status(204).send();
    }catch(e) {
        res.status(500).send({
            message: "Something went wrong"
        })
    }
}