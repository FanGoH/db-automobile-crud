export const typeOfVariables = [
	{ name: "1", restriction: "twoDates" },
	{ name: "2", restriction: "twoDates" },
	{ name: "3", restriction: "none" },
	{ name: "4", restriction: "none" },
	{ name: "5", restriction: "twoDates" },
	{ name: "6", restriction: "twoDates,departamento.nombre" },
	{ name: "7", restriction: "twoDates" },
	{ name: "8", restriction: "departamento.nombre" },
	{ name: "9", restriction: "none" },
	{ name: "10", restriction: "departamento.nombre" },
	{ name: "11", restriction: "twoDates" },
	{ name: "12", restriction: "twoDates" },
	{ name: "13", restriction: "twoDates" },
	{ name: "14", restriction: "twoDates" },
	{ name: "15", restriction: "twoDates" },
	{ name: "16", restriction: "none" },
	{ name: "17", restriction: "twoDates" },
	{ name: "18", restriction: "none" },
	{ name: "19", restriction: "twoDates" },
	{ name: "20", restriction: "twoDates" },
	{ name: "21", restriction: "none" },
	{ name: "22", restriction: "twoDates" },
	{ name: "23", restriction: "none" },
	{ name: "24", restriction: "none" },
	{ name: "25", restriction: "twoDates" },
	{ name: "26", restriction: "twoDates" },
	{ name: "27", restriction: "twoDates" },
	{ name: "28", restriction: "none" },
	{ name: "29", restriction: "twoDates" },
	{ name: "30", restriction: "twoDates" },
];

export const parseNeeds = (queryName: string) => {
	const parametersRaw = typeOfVariables.find(
		({ name }) => name === queryName
	);
	if (!parametersRaw) {
		return [];
	}

	const parameters = parametersRaw.restriction.split(",");

	return parameters;
};
