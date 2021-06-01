import { Router } from "express";
import { findInTable } from "../../db/controllers/generic";
import { executeDynamicQuery } from "../../db/controllers/query/queryCaller";
import { makeTestQueryNo } from "../../db/controllers/testQueries";
import { queries } from "../../db/controllers/testQueries/queries";
import { parseNeeds } from "../api/testqueries/dynamicQueries";

export const router = Router();

router.get("/:queryID", async (req, res) => {
	const { queryID } = req.params;

	const results = await makeTestQueryNo(parseInt(queryID));

	if (results.length === 0) {
		res.render("pages/emptyQuery");
		return;
	}

	res.render("pages/arbitraryQuery", {
		queryDesc: queries[parseInt(queryID) - 1].description,
		tableHeaders: Object.keys(results[0] as any),
		tableContent: results,
	});
});

router.get("/dynamic/:queryID", async (req, res) => {
	const needs = parseNeeds(req.params.queryID);

	const finalNames: string[] = [];
	const argsForTemplate: {
		fieldName: string;
		fieldType: string;
		values?: any[];
	}[] = [];

	if (needs.includes("twoDates")) {
		finalNames.push("fecha_inicio", "fecha_final");

		argsForTemplate.push(
			{
				fieldName: "fecha_inicio",
				fieldType: "date",
			},
			{
				fieldName: "fecha_final",
				fieldType: "date",
			}
		);
	}

	const referencedField = needs.find((need) => need.includes("."));

	if (referencedField) {
		const [tableName, tableField] = referencedField.split(".");

		const referencedResults = await findInTable(tableName, "", {
			[tableField]: true,
		});

		argsForTemplate.push({
			fieldName: referencedField,
			fieldType: "select",
			values: referencedResults,
		});
	}

	res.render("pages/testsQueriesForm", {
		queryName: req.params.queryID,
		argsForTemplate,
	});
});
