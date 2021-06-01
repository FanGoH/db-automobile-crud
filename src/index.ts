import express from "express";
import { json as bodyJson, urlencoded } from "body-parser";
import { config } from "dotenv";
import path from "path";
import { router as ApiRouter } from "./routes/api/index";
import { router as ViewsRouter } from "./routes/views";

import { createServer } from "livereload";
import connectLR from "connect-livereload";
import prepareEJS from "./views/helpers";
import { loadQueries } from "./db/controllers/query/queryLoader";

config();

const liveReloadServer = createServer({ extraExts: ["ejs"] });
liveReloadServer.watch([
	path.join(__dirname + "/views"),
	path.join(__dirname + "/public"),
]);

const app = express();

app.use(bodyJson());
app.use(urlencoded({ extended: true }));
app.use(connectLR());

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.engine("ejs", prepareEJS);

app.use(express.static(path.join(__dirname + "/views/public")));

app.use("/api", ApiRouter);
app.use("/", ViewsRouter);

app.get("/", async (_, res) => {
	res.json({ hello: "world" });
});

app.listen({ port: 3005 }, () => {
	console.log("listening at: http://localhost:3005");
});

loadQueries();
