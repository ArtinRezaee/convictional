import asyncHandler from "express-async-handler";
import httpErrors from "http-errors";
import { Router } from "express";
import { getDatasources } from "../../dataSources";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const datasources = getDatasources();

    const inventoryPromises = datasources.map((datasource) =>
      datasource.getInventory()
    );

    return Promise.all(inventoryPromises)
      .then((inventories) => {
        res.status(200).send(inventories.flat());
      })
      .catch((err) => {
        console.error(err);
        return next(httpErrors(500, err.message));
      });
  })
);

export const getInventory = router;
