import express from "express";
import fs from "fs";
import path from "path";
import xml2js from "xml2js";
import covid19ImpactEstimator from "./data/estimator";
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
const router = express.Router();
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
router.post(
  "/api/v1/on-covid-19",

  (req, res) => {
    const data =
      req.body;
    const covid = covid19ImpactEstimator(
      data
    );

    return res
      .status(201)
      .send(covid);
  }
);
router.post(
  "/api/v1/on-covid-19/json",
  (req, res) => {
    const data =
      req.body;
    const covid = covid19ImpactEstimator(
      data
    );
    return res
      .status(201)
      .send(covid);
  }
);
router.post(
  "/api/v1/on-covid-19/xml",
  (req, res) => {
    const data =
      req.body;
    const covid = covid19ImpactEstimator(
      data
    );
    res.contentType(
      "application/xml"
    );

    return res
      .status(201)
      .send(
        builder.buildObject(
          covid
        )
      );
  }
);

router.get(
  "/api/v1/on-covid-19/logs",
  (req, res) => {
    // return log
    res.set(
      "content-type",
      "text/plain"
    );
    const logStream = fs.createReadStream(
      path.join(
        process.cwd(),
        "./app.log"
      )
    );

    logStream.on(
      "open",
      () => {
        logStream.pipe(
          res
        );
      }
    );
    logStream.on(
      "error",
      () => {
        res
          .status(
            500
          )
          .end(
            "Log file error"
          );
      }
    );
  }
);

export default router;
