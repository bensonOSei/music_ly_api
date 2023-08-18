import express from "express";
import { extractSongDetailsFromQuery, generateChatResponseFromUserQuery, streamChatResponse } from "../controllers/queryController.mjs";
import { getSongDataFromSpotify } from "../controllers/trackControllers.mjs";


export const router = express.Router();

router.post("/query", generateChatResponseFromUserQuery);

router.post("/query/stream", streamChatResponse);

router.post("/query/song", getSongDataFromSpotify )

router.post("/query/extract", extractSongDetailsFromQuery)

router.get("/test", (req, res) =>
	res.send({
		message: "Hello World!",
	})
);
