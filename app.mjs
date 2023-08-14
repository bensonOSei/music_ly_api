import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { router } from "./src/routes/queryRoutes.mjs";
import { authRouter } from "./src/routes/authRoutes.mjs";
import { usersRouter } from "./src/routes/userRoutes.mjs";
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
app.use('/auth',authRouter)
app.use('/users', usersRouter)

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
