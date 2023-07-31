import express from "express";
import { getQuery } from "../controllers/queryController.mjs";

export const router = express.Router();

router.post("/query", getQuery);
router.get("/test", (req, res) =>
	res.send({
		message: "Hello World!",
	})
);
