import express from "express";
import { login } from "../controllers/authController.mjs";
import { validateLogin } from "../middleware/validation.mjs";
import { authenticate } from "../middleware/auth.mjs";

export const authRouter = express.Router();

authRouter.post("/login", validateLogin, login);


authRouter.get("/user", authenticate, (req, res) => {
    res.send({
        data: req.user,
    });
})


