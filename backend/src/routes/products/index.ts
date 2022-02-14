import { Router } from "express";
import { getProducts } from "./products";

const router = Router();

router.use("/", getProducts);

export const productRoutes = router;
