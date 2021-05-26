import { createCliente, findClientes } from "../../../db/controllers/cliente";
import { Router } from "express";
import { generateFieldsObject } from "../../../db/Helpers/queryFields";

export const router = Router();

router.get("/", async (req, res) => {
	const fields = generateFieldsObject(req.body);

	res.json(await findClientes());
});

router.post("/", async (req, res) => {
	const result = await createCliente(req.body);

	res.json(result);
});
