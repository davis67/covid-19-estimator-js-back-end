import express from "express";
import bodyParser from "body-parser";
import router from "./router";

const app = express();

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
