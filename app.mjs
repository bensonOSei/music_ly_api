import express from "express";
import { config } from "dotenv";
import { router } from "./src/routes/queryRoutes.mjs";
config()
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
	res.send({
		message: "Hello World!",
	});
});

app.use("/api", router);

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
