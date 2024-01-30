

import { Router } from "express";
import { createUser, getUser } from "../controller/UserController";

const router = Router();

router.post("/signup", createUser);
router.post("/login", getUser);

// Add routes for other CRUD operations as needed

export default router;
