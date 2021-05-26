import { Router } from "express";
import { getTableNames } from "../../db/Helpers/tableNames";

import { router as clienteRouter } from "./clientes";
import { router as automovilRouter } from "./automovil";
import { router as genericRouter } from "./generic";

export const router = Router();

router.get("/info", async (_req, res) => {
	res.send(await getTableNames());
});

router.use("/clientes", clienteRouter);

router.use("/automovil", automovilRouter);

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
