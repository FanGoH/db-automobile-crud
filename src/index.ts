import express from "express";
import { json as bodyJson } from "body-parser";
import { config } from "dotenv";
import { router as ApiRouter } from "./routes/api/index";

config();
const app = express();

app.use(bodyJson());

app.use("/api", ApiRouter);

app.get("/", (_, res) => {
	res.send("Hello World!");
});

app.listen({ port: 3005 }, () => {
	console.log("listening at: http://localhost:3005");
});
