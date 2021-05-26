import { db } from "../../db";

export const makeQuery = async (query: string) => {
	return await (await db()).execute(query);
};
