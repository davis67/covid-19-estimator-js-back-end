import express from "express";
import fs from "fs";
import path from "path";
import xml2js from "xml2js";
import covid19ImpactEstimator from "./data/estimator";
import appRoot from "app-root-path";
const router = express.Router();

//xml builder
const builder = new xml2js.Builder(
  {
    xmldec: {
      standalone: null,
      version:
        "1.0",
      encoding:
        "UTF-8"
    }
  }
);

//route for the index page
router.get(
  "/",
  function (
    req,
    res
  ) {
    res.send(
      "Welcome to covid-19 estimator api .simply visit /api/v1/on-covid-19/xml or /api/v1/on-covid-19/json"
    );
  }
);

// /api/v1/on-covid-19 endpoint
router.post(
  "/api/v1/on-covid-19",

  (req, res) => {
    const data =
      req.body;
    const covid = covid19ImpactEstimator(
      data
    );

    return res
      .status(200)
      .json(covid);
  }
);
// /api/v1/on-covid-19/json endpoint
router.post(
  "/api/v1/on-covid-19/json",
  (req, res) => {
    const data =
      req.body;
    const covid = covid19ImpactEstimator(
      data
    );
    return res
      .status(200)
      .json(covid);
  }
);

// /api/v1/on-covid-19/xml endpoint
router.post(
  "/api/v1/on-covid-19/xml",
  (req, res) => {
    const data =
      req.body;
    const covid = covid19ImpactEstimator(
      data
    );
    res.header(
      "Content-Type",
      "application/xml; charset=UTF-8"
    );

    return res
      .status(200)
      .send(
        builder.buildObject(
          covid
        )
      );
  }
);

// logs
router.get(
  "/api/v1/on-covid-19/logs",
  (req, res) => {
    global.appRoot = appRoot;
    const filePath = global.appRoot.resolve(
      "dist/logs"
    );
    const log =
      filePath +
      "/access.log";
    fs.readFile(
      path.join(
        log
      ),
      {
        encoding:
          "utf8",
        flag: "r"
      },
      (
        err,
        data
      ) => {
        if (err)
          throw err;

        res.set(
          "content-type",
          "text/plain"
        );

        console.log(
          data
        );

        return res.send(
          data
        );
      }
    );
  }
);

export default router;
