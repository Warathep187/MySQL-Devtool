import { Request, Response } from "express";
import { Table } from "../types/table";
import { Connection, createConnection } from "mysql";
const util= require("util");
 
let connection: Connection;

export const createConnectionHandler = async (req: Request, res: Response) => {
    try {
        const { database } = req.body as { database: string };
        connection = createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: database
        });
        connection.connect(async(err) => {
            if(err) {
                res.status(404).send({
                    message: "Database not found",
                })
            } else {
                connection.query = util.promisify(connection.query);
                res.status(201).send({
                    message: "MySQL connected successfully",
                });
            }
        });
    } catch (e) {
        res.status(500).send({
            message: "Something went wrong",
        });
    }
};

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
        const desc = await connection.query(`DESC ${table_name}`) as unknown as [];
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