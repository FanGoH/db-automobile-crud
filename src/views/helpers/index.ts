import { Data, renderFile, RenderFileCallback } from "ejs";
import { TableColumn } from "../../db/controllers/generic";
import {
	argsForTemplateParser,
	generateFormFieldHTML,
	generateReferencedFormFieldHTML,
} from "./formParser";

export const helpers: { [index: string]: Function } = {};

helpers["displayifyName"] = (name: string) =>
	name
		.split("_")
		.map((string) => string.charAt(0).toUpperCase() + string.slice(1))
		.reduce((curr, value) => curr + " " + value, "");

helpers["generateField"] = generateFormFieldHTML;

helpers["referenceField"] = generateReferencedFormFieldHTML;

helpers["argsForTemplateParser"] = argsForTemplateParser;

export default function prepareEJS(
	path: string,
	data: Data,
	cb: RenderFileCallback<any>
) {
	renderFile(path, { ...data, helpers }, {}, cb);
}
