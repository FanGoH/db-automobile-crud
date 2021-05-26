import {
	objectKeysToString,
	prepareObjectsForQuery,
} from "../../../db/Helpers/objectToString";
import { makeQuery } from "../../Helpers/query";


export type QueryFields<T> = {
	[Campo in keyof T]?: boolean;
};

export const findInTable = async <T>(
	tableName: string,
	where = "",
	fields: "*" | QueryFields<T> = "*"
) => {
	let fieldString = "";
	if (typeof fields == "string") {
		fieldString = fields;
	} else {
		fieldString = objectKeysToString(fields);
	}

	const [res] = await makeQuery(`SELECT ${fieldString} FROM ${tableName}`);

	return res;
};

export const createInTable = async <T>(
	tableName: string,
	valuesToInsert: T
) => {
	const { keys, values } = prepareObjectsForQuery(valuesToInsert);

	const [result] = await makeQuery(
		`INSERT INTO ${tableName}(${keys}) VALUES (${values});`
	);

	return result;
};
