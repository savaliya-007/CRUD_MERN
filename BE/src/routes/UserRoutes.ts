

import { Router } from "express";
import { createUser } from "../controller/UserController";

const router = Router();

router.post("/", createUser);

// Add routes for other CRUD operations as needed

export default router;
