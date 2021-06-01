import { RowDataPacket } from "mysql2";
import { db } from "../../db";

export const makeQuery = async <T, S = any>(query: string) => {
	return (await (await db()).execute<RowDataPacket[]>(query)) as unknown as [
		T[],
		S[]
	];
};
