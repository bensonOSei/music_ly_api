import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { router } from "./src/routes/queryRoutes.mjs";
config();

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
	res.send({
		message: "Welcome to Music.ly API",
	});
});

app.use("/api", router);

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
