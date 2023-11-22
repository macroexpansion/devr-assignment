import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { getDataHandler, eventHandler } from "./router.js";

const main = async () => {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.get("/", (req, res) => {
    res.send("Hello world");
  });

  app.get("/data", getDataHandler);
  app.get("/event", eventHandler);

  const port = 8081;
  app.listen(port, () => {
    console.log(`Listen on port ${port}`);
  });
};

main();
