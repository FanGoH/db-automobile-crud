import {
	objectKeysToString,
	prepareObjectsForQuery,
} from "../../../db/Helpers/objectToString";
import { Cliente } from "../../../../taller";
import { makeQuery } from "../../Helpers/query";

type ClienteFields = {
	[Campo in keyof Cliente]?: boolean;
};

export const findClientes = async (
	where = "",
	fields: "*" | ClienteFields = "*"
) => {
	let fieldString = "";
	if (typeof fields == "string") {
		fieldString = fields;
	} else {
		fieldString = objectKeysToString(fields);
	}

	const [res] = await makeQuery(`SELECT ${fieldString} FROM cliente`);

	return res;
};

export const createCliente = async (clienteInfo: Cliente) => {
	const { keys, values } = prepareObjectsForQuery(clienteInfo);

	const [result] = await makeQuery(
		`INSERT INTO cliente(${keys}) VALUES (${values});`
	);

	return result;
};
