import { QueryFields } from "../controllers/generic";

export const generateFieldsObject = <T>(
	requestBody: (keyof T)[]
): QueryFields<T> | "*" => {
	const obj: QueryFields<T> = {};

	if (requestBody.length === 0) {
		return "*";
	}

	requestBody.forEach((fieldName) => {
		obj[fieldName] = true;
	});

	return obj;
};
