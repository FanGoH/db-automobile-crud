import mysql from "mysql2/promise";

const startDbConnection = async () => {
	return await mysql.createConnection({
		host: process.env.DATABASE_HOST,
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME,
		multipleStatements: true,
	});
};

export { startDbConnection as db };
