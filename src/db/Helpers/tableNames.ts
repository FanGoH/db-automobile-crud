import { makeQuery } from "./query";

export const getTableNames = async (): Promise<string[]> => {
	const [results] = await makeQuery("SHOW TABLES;");
	if (Array.isArray(results)) {
		return results.map((result: any) => result.Tables_in_tallermecanico);
	}

	return [];
};
