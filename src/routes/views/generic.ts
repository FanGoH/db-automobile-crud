import { Router } from "express";
import { Cliente, Tablas } from "../../../taller";
import { findInTable, findTableColumns } from "../../db/controllers/generic";
import { generateFieldsObject } from "../../db/Helpers/queryFields";

export const router = Router({ mergeParams: true });

router.get("/", async (req, res) => {
	const { table } = req.params;
	const select = "*";

	const tableColumns = (await findTableColumns<Cliente>(table, select)).map(
		(row) => row.Field
	);
	const clientsInfo = await findInTable(table, "", select);

	res.render("pages/tables", {
		tableHeaders: tableColumns,
		tableContent: clientsInfo,
	});
});

router.get("/create", async (req, res) => {
	const { table } = req.params;

	const tableColumns = (await findTableColumns(table, "*", true)).map(
		(row) => ({
			Field: row.Field,
			Type: row.Type,
			Nullable: row.Null,
			Key: row.Key,
			References: row.References,
		})
	);

	const referencesFields = await Promise.all(
		tableColumns
			.filter((columna) => columna.References !== undefined)
			.map(({ References }) => References)
			.map(async (objeto) => {
				if (typeof objeto === "string") {
					const [nombreTabla, campo] = objeto.split(".");

					return {
						tableName: objeto,
						data: await findInTable(nombreTabla, "", {
							[campo]: true,
						}),
					};
				}
			})
	);

	res.render("pages/forms", {
		tableName: table,
		tableColumns,
		referencedFields: referencesFields,
	});
});
