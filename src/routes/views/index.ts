import { Router } from "express";
import { findInTable, findTableColumns } from "../../db/controllers/generic";
import { getTableNames } from "../../db/Helpers/tableNames";

import { router as genericRouter } from "./generic";
import { router as testQueriesRouter } from "./testQueries";

export const router = Router();

router.get("/tablenames", async (_, res) => {
	res.render("pages/tableNames", { tableNames: await getTableNames() });
});

router.use("/tests", testQueriesRouter);

router.use(
	"/:table",
	async (req, res, next) => {
		const { table } = req.params;
		if ((await getTableNames()).findIndex((val) => val === table) === -1) {
			res.status(400).json({ problem: "Invalid TableName" });
			return;
		}

		next();
	},
	genericRouter
);
