import express from "express";
import { extractSongDetailsFromQuery, generateChatResponseFromUserQuery, streamChatResponse } from "../controllers/queryController.mjs";
import { getSongDataFromSpotify } from "../controllers/trackControllers.mjs";


export const router = express.Router();

router.post("/query", generateChatResponseFromUserQuery);

router.post("/query/stream", streamChatResponse);

router.post("/query/song", getSongDataFromSpotify )

router.post("/query/extract", extractSongDetailsFromQuery)

router.get("/healthcheck", (req, res) =>
	res.status(200).send({
		message: "Service healthy :)",
	})
);
