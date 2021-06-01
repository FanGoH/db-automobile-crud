import {
	objectKeysToString,
	prepareObjectsForQuery,
} from "../../../db/Helpers/objectToString";
import { makeQuery } from "../../Helpers/query";

export type QueryFields<T> = {
	[Campo in keyof T]?: boolean;
};

export interface TableColumn<T = any> {
	Field: keyof T;
	Type: string;
	Null: "YES" | "NO";
	Key: string;
	Default: null | any;
	Extra: string;
	References?:
		| {
				TableName: string;
				ForeignField: string;
		  }
		| string;
}

export type TableFields = {
	[Campo in keyof TableColumn]?: boolean;
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

export const findTableColumns = async <T>(
	tableName: string,
	fields: "*" | (keyof T)[] | QueryFields<T> = "*",
	referencesInString: boolean = false
) => {
	let [result] = await makeQuery<TableColumn<T>>(
		`SHOW COLUMNS FROM ${tableName}`
	);
	const tableReferences = await referencesQuery(tableName, false);

	result = result.map((col) => {
		const references = tableReferences.find(
			(ref) => ref["foreign key"] === col.Field
		)?.references;

		return {
			...col,
			...(references &&
				!referencesInString && {
					References: {
						TableName: references.split(".")[0],
						ForeignField: references.split(".")[1],
					},
				}),
			...(references &&
				referencesInString && {
					References: references,
				}),
		};
	});

	if (Array.isArray(fields)) {
		return result
			.filter(({ Field }) => fields.includes(Field))
			.sort((a, b) => fields.indexOf(a.Field) - fields.indexOf(b.Field));
	}
	if (typeof fields !== "string") {
		const fieldsToInclude = Object.keys(fields) as (keyof T)[];
		return result
			.filter(({ Field }) => fieldsToInclude.includes(Field))
			.sort(
				(a, b) =>
					fieldsToInclude.indexOf(a.Field) -
					fieldsToInclude.indexOf(b.Field)
			);
	}

	return result;
};

export const referencesQuery = async (
	tableName: string,
	withSuffix: boolean = true
) => {
	const [result] = await makeQuery<{
		"foreign key": string;
		references: string;
	}>(`  select
    ${
		withSuffix ? "concat(table_name, '.', column_name)" : "column_name"
	} as 'foreign key',  
    concat(referenced_table_name, '.', referenced_column_name) as 'references'
from
    information_schema.key_column_usage
where
    referenced_table_name is not null
    and table_schema = 'tallermecanico' 
    and table_name = '${tableName}';`);

	return result;
};
