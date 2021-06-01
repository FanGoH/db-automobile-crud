import { makeQuery } from "../../Helpers/query";
import { queries } from "./queryLoader";

// el data es un diccionario
export const executeDynamicQuery = async (name: string, data: any) => {
	const query = parseQuery(name, data);
	return (await makeQuery(query))[0];
};

const parseQuery = (name: string, data: any) => {
	const query = queries[name];

	if (query === undefined) throw "The selected query does not exist";
	// bua aser fuersas bruta 8)
	// que dp ni que nada //NO HABIA VISTO ESTE COMENTARIO XD
	// lleve un semestre de algoritmos para esto 8)
	let parsedQuery = "";
	for (let i = 0; i < query.length; i++) {
		if (query[i] === "{" && query[i + 1] === "{") {
			let key = "";
			for (i = i + 2; !(query[i] === "}" && query[i + 1] === "}"); i++) {
				key += query[i];
			}
			const value = data[key];

			if (value === undefined) throw "Not enough arguments";
			parsedQuery += data[key];
		} else {
			parsedQuery += query[i];
		}
	}
	return parsedQuery;
};
