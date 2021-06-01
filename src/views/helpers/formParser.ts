import { TableColumn } from "../../db/controllers/generic";
import { helpers } from "./index";

export const returnFieldType = (fieldType: string) => {
	const stripedType = fieldType.split("(")[0];

	switch (stripedType) {
		case "varchar":
		case "char":
			return "text";

		case "bigint":
		case "int":
		case "decimal":
			return "number";

		case "datetime":
			return "date";

		case "tinyint":
			return "checkbox";
		default:
			break;
	}
};

// <div class="form-text">${JSON.stringify(col)}</div>

export const generateFormFieldHTML = (col: TableColumn) => {
	return `
                <label class="form-label" for=${String(
					col.Field
				)}>${helpers.displayifyName(String(col.Field))} </label>
<input class="${
		returnFieldType(col.Type) !== "checkbox" ? "form-control" : ""
	}" type=${returnFieldType(col.Type)} name=${String(col.Field)}> </input>
<span class="validity" ></span>
`;
};

export const generateReferencedFormFieldHTML = (
	col: TableColumn,
	referencedFieldsArray: { tableName: string; data: { [e: string]: any }[] }
) => {
	const testRow = referencedFieldsArray.data.map(
		(object) => Object.values(object)[0]
	);

	let optionsString: string = "";

	for (let row of testRow) {
		optionsString += `<option value="${row}"> ${row} </option>"`;
	}

	return `
<label class="form-label" for=${String(col.Field)} > ${helpers.displayifyName(
		String(col.Field)
	)} </label>
<select class="form-select" name=${String(col.Field)}>
	 ${optionsString}


</select>


`;
};

export const argsForTemplateParser = (argsForTemplate: {
	fieldName: string;
	fieldType: string;
	values?: any[];
}) => {
	if (!argsForTemplate.values) {
		return `<label class="form-label" for=${String(
			argsForTemplate.fieldName
		)}>${helpers.displayifyName(String(argsForTemplate.fieldName))} </label>
<input class="${
			argsForTemplate.fieldType !== "checkbox" ? "form-control" : ""
		}" type=${argsForTemplate.fieldType} name=${String(
			argsForTemplate.fieldName
		)}> </input>
<span class="validity" ></span>`;
	}

	const testRow = argsForTemplate.values.map(
		(object) => Object.values(object)[0]
	);

	let optionsString: string = "";

	for (let row of testRow) {
		optionsString += `<option value="${row}"> ${row} </option>"`;
	}

	return `<label class="form-label" for=${String(
		argsForTemplate.fieldName
	)} > ${helpers.displayifyName(String(argsForTemplate.fieldName))} </label>
<select class="form-select" name=${String(argsForTemplate.fieldName)}>
	 ${optionsString}


</select>`;
};
