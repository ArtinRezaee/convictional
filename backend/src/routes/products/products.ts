import asyncHandler from "express-async-handler";
import httpErrors from "http-errors";
import { Router } from "express";
import validator from "validator";
import { getDatasources } from "../../dataSources";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const datasources = getDatasources();

    const productPromises = datasources.map((datasource) =>
      datasource.getProducts()
    );

    return Promise.all(productPromises)
      .then((products) => {
        if (products.length <= 0) {
          res.status(404).send({
            message: "Product not found",
          });
        }
        res.status(200).send(products.flat());
      })
      .catch((err) => {
        console.error(err);
        return next(httpErrors(500, err.message));
      });
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const productId = req.params.id as string;

    if (!productId || !validator.isNumeric(productId, { no_symbols: true })) {
      return next(
        res.status(400).send({
          message: "Invalid ID supplied",
        })
      );
    }

    const datasources = getDatasources();

    const productPromises = datasources.map((datasource) =>
      datasource.getProduct(productId)
    );

    return Promise.all(productPromises)
      .then((products) => {
        const filteredProducts = products.filter((product) => product);
        if (filteredProducts.length <= 0) {
          res.status(404).send({
            message: "Product not found",
          });
        }
        res.status(200).send(filteredProducts[0]);
      })
      .catch((err) => {
        console.error("This is my err: ", err);
        return next(httpErrors(500, err.message));
      });
  })
);

export const getProducts = router;
