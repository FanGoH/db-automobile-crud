import { Router } from "express";
import { executeDynamicQuery } from "../../../db/controllers/query/queryCaller";
import { makeTestQueryNo } from "../../../db/controllers/testQueries";
import { parseNeeds } from "./dynamicQueries";

export const router = Router();

router.get("/dynamic/:queryNo", async (req, res) => {
	const { queryNo } = req.params;
	const resultados = parseNeeds(queryNo);
	let terminateRequest = false;

	console.log(req.body);

	resultados.forEach((restriction) => {
		if (terminateRequest) return;

		if (typeof restriction === "string") {
			if (
				!req.body[restriction] &&
				restriction !== "none" &&
				restriction !== "twoDates"
			) {
				res.json({ error: "You didn't pass the parameters" });
				terminateRequest = true;
				return;
			} else if (restriction === "twoDates") {
				if (!req.body["fecha_inicio"] || !req.body["fecha_final"]) {
					res.json({ error: "You didn't pass the parameters" });
					terminateRequest = true;
					return;
				}
			}
		}
	});

	if (terminateRequest) {
		return;
	}

	res.json(await executeDynamicQuery(queryNo, req.body));
});

router.get("/:queryNo", async (req, res) => {
	const { queryNo } = req.params;
	const results = await makeTestQueryNo(parseInt(queryNo));
	res.send(results);
});
router.post("/dynamic/:queryNo", async (req, res) => {
	const { queryNo } = req.params;
	const resultados = parseNeeds(queryNo);
	let terminateRequest = false;

	resultados.forEach((restriction) => {
		if (terminateRequest) return;

		if (typeof restriction === "string") {
			if (
				!req.body[restriction] &&
				restriction !== "none" &&
				restriction !== "twoDates"
			) {
				res.json({ error: "You didn't pass the parameters" });
				terminateRequest = true;
				return;
			} else if (restriction === "twoDates") {
				if (!req.body["fecha_inicio"] || !req.body["fecha_final"]) {
					res.json({ error: "You didn't pass the parameters" });
					terminateRequest = true;
					return;
				}
			}
		}
	});

	if (terminateRequest) {
		return;
	}

	const queryResults = await executeDynamicQuery(queryNo, req.body);

	if (queryResults.length === 0) {
		//TODO: EMPTY QUERY TEMPLATE:
		res.render("pages/emptyQuery");
		return;
	}

	res.render("pages/testsQueryResultsTemplate", {
		tableHeaders: Object.keys(queryResults[0] as any),
		tableContent: queryResults,
	});
});
