import { Router } from "express";
import { Tablas } from "../../../../taller";
import {
	createInTable,
	findInTable,
	findTableColumns,
	referencesQuery,
} from "../../../db/controllers/generic";
import { parseFormData } from "../../../db/controllers/generic/parseFormData";
import { executeDynamicQuery } from "../../../db/controllers/query/queryCaller";
import { generateFieldsObject } from "../../../db/Helpers/queryFields";
export const router = Router({ mergeParams: true });

router.get("/", async (req, res) => {
	const { table } = req.params;
	const fields = generateFieldsObject(req.body);
	const results = await findInTable(table, "", fields);

	res.json(results);
});

router.get("/info", async (req, res) => {
	const { table } = req.params;

	const results = await findTableColumns(table);

	res.json(results);
});

router.get("/references", async (req, res) => {
	const { table } = req.params;

	const results = await referencesQuery(table, req.body.suffix);

	res.json(results);
});

router.post("/", async (req, res) => {
	const { table } = req.params; //

	const results = await createInTable(table, req.body);

	res.json(results);
});

router.post("/form", async (req, res) => {
	const { table } = req.params as { table: keyof Tablas };
	const data = req.body;

	const result = await parseFormData(table, data);
	await createInTable(table, result);

	res.redirect(`/${table}/`);
});
