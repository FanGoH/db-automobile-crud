import { Router } from "express";
import { createInTable, findInTable } from "../../../db/controllers/generic";
import { generateFieldsObject } from "../../../db/Helpers/queryFields";

export const router = Router({ mergeParams: true });

router.get("/", async (req, res) => {
	const { table } = req.params;
	const fields = generateFieldsObject(req.body);
	const results = await findInTable(table, "", fields);

	res.json(results);
});

router.post("/", async (req, res) => {
	const { table } = req.params; //

	const results = await createInTable(table, "");

	res.json(results);
});
