import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import appRoot from "app-root-path";
import router from "./router";
import fs from "fs";

const app = express();

//logger
global.appRoot = appRoot;
const filePath = global.appRoot.resolve(
  "dist/logs"
);
morgan.token(
  "response-time-ms",
  function getResponse(
    req,
    res
  ) {
    const time =
      this[
        "response-time"
      ](
        req,
        res,
        0
      ) < 10
        ? `0${this[
            "response-time"
          ](
            req,
            res,
            0
          )}ms`
        : `${this[
            "response-time"
          ](
            req,
            res,
            0
          )}ms`;
    return time;
  }
);
const log = `${filePath}/access.json`;
app.use(
  morgan(
    ":method\t\t:url\t\t:status\t\t:response-time-ms",
    {
      stream: fs.createWriteStream(
        log,
        {
          flags: "a"
        }
      )
    }
  )
);

//json
app.use(
  bodyParser.json()
);
app.use(
  bodyParser.urlencoded(
    {
      extended: false
    }
  )
);
app.use(router);

//port
const PORT =
  process.env
    .NODE_ENV ===
  "production"
    ? process.env
        .PORT
    : 5000;

app.listen(
  PORT,
  () => {
    console.log(
      `Server started on port: ${PORT}`
    );
  }
);
