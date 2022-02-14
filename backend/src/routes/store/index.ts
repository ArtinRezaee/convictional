import { Router } from "express";
import { getInventory } from "./inventory";

const router = Router();

router.use("/inventory", getInventory);

export const storeRoutes = router;
