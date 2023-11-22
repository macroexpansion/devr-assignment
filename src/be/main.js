import express from "express";
import cors from "cors";

import { getData } from "./router.js";

const main = async () => {
  const app = express();

  app.use(cors());

  app.get("/", (req, res) => {
    res.send("Hello world");
  });

  app.get("/data", getData);

  const port = 8081;
  app.listen(port, () => {
    console.log(`Listen on port ${port}`);
  });
};

main();
