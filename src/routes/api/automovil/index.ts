import { Router } from "express";
import { Automovil } from "../../../../taller";
import { getAutomovilesByClientID } from "../../../db/controllers/automovil";
import { generateFieldsObject } from "../../../db/Helpers/queryFields";

export const router = Router({ mergeParams: true });

router.get("/cliente/:clientID", async (req, res) => {
	const fields = generateFieldsObject<Automovil>(req.body);

	const result = await getAutomovilesByClientID<Automovil>(
		req.params.clientID,
		fields
	);

	res.send(result);
});
