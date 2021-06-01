const axios = require("axios");
const fs = require("fs");

axios.get("http://localhost:3005/api/info").then((res) => {
	const tableNames = res.data;

	for (let table of tableNames) {
		// console.log("http://localhost:3005/api/" + table + "/info");
		axios
			.get("http://localhost:3005/api/" + table + "/info")
			.then((res) => {
				fs.writeFileSync(
					"./helps/data" + table + ".json",
					JSON.stringify({ table: res.data })
				);
			});
	}
});
