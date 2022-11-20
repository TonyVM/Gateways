import pmysql from 'promise-mysql';

const connection = pmysql.createConnection({
   host: "127.0.0.1",
   database: "gateways_db",
   user: "root",
   password: "root123"
});

export const getConnectionMySQL = () => {
   return connection
}

