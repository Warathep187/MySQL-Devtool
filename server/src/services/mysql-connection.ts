import { Connection, createConnection } from "mysql";
const util= require("util");

export let connection: Connection;

export const connectToMysql = async () => {
    try {
        connection = createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD
        });
        connection.connect(async(err) => {
            if(err) {
                throw new Error("Connection Error")
            } else {
                connection.query = util.promisify(connection.query);
                console.log("MySQL is connected")
            }
        });
    } catch (e) {
        throw new Error("Something went wrong")
    }
}