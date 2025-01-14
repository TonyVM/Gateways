import pmysql from 'promise-mysql';
import {config} from 'dotenv';
config();

const connection = pmysql.createConnection({
   host: process.env.DB_HOST || "127.0.0.1",
   database: process.env.DB || "gateways_db",
   user: process.env.DB_USER || 'root',
   password: process.env.DB_PASS || 'pass'
});

export const getConnectionMySQL = () => {
   return connection
}

