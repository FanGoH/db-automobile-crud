const queryPath = "/dbQueries";

import fs from "fs";
import path from "path";
// me quede en el pasado 8)

//solo lo hago por el intellisense

// a ya vi el rpoblema, que burro
//que no esrtabas usando el intellisense de TS?(8
// a no era ese 8), solo estoy burro

export let queries: any = {};
export function loadQueries() {
	fs.readdirSync(path.join(__dirname, queryPath)).forEach((file: any) => {
		const id = file.split(".")[0];
		const data = fs.readFileSync(
			path.join(__dirname, `${queryPath}/${file}`)
		);
		queries[id] = data.toString(); ///creo que si es o to Buffer
	});
	// ya cargan 8)
}

//Checa Messenger
