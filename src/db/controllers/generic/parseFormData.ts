import { findTableColumns } from ".";
import { returnFieldType } from "../../../views/helpers/formParser";
import { Tablas } from "../../../../taller";

export const parseFormData = async <T extends keyof Tablas>(
	tableName: keyof Tablas,
	formData: Tablas[T]
) => {
	const tableColumns = await findTableColumns<Tablas[T]>(
		tableName,
		"*",
		false
	);

	const transformedData: { [e: string]: any } = {};
	Object.values(formData).forEach((value, idx) => {
		const indexToGet = tableColumns[idx].Field as string;
		const fieldRestriction = parseFieldRestrictions(tableColumns[idx].Type);

		transformedData[indexToGet] = parseDependingOnType(
			fieldRestriction,
			value
		);
	});

	return transformedData;
};

const parseDependingOnType = (
	field: FieldRestrictions,
	requestValue: string
) => {
	const stringTypes = ["date", "datetime", "datetime", "char", "varchar"];
	const intTypes = ["int", "bigint"];
	const floatTypes = ["decimal"];
	const booleanTypes = ["tinyint"];

	if (stringTypes.includes(field.typename)) return requestValue;

	if (intTypes.includes(field.typename)) return parseInt(requestValue);

	if (floatTypes.includes(field.typename)) return parseFloat(requestValue);

	if (booleanTypes.includes(field.typename)) return requestValue === "on";
};

interface FieldRestrictions {
	typename: string;
	length?: { maxLength?: number; minLength?: number } | number;
	references?: any;
}

const parseFieldRestrictions = (fieldType: string): FieldRestrictions => {
	const fieldName = fieldType.split("(")[0];
	const limits = fieldType.includes("(")
		? fieldType.split("(")[1].split(")")[0]
		: null;

	return {
		typename: fieldName,
	};
};
