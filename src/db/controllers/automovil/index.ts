
import { objectKeysToString } from "../../Helpers/objectToString";
import { makeQuery } from "../../Helpers/query";
import { QueryFields } from "../generic";

export const getAutomovilesByClientID = async <T>(
	clientID: string,
	fields: "*" | QueryFields<T> = "*"
) => {
	let sel: string;

	if (typeof fields !== "string") {
		sel = objectKeysToString(fields);
	} else {
		sel = fields;
	}

	const [results] = await makeQuery(
		`SELECT ${sel} FROM automovil WHERE cliente_dni = "${clientID}";`
	);

	return results;
};
