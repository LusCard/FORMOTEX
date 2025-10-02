import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { authorizeRole, authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/login", login);

router.post("/register", authenticate, authorizeRole("admin"), register);

export default router;
