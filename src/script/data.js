import fs from "fs";

import * as d3 from "d3";

import {
  redis,
  addPopuStream,
  addRegionStream,
  readPopuStream,
  POPU_STREAM,
  REGION_STREAM,
} from "../be/redis.js";
import { timestamps } from "../common.js";

const readData = async () => {
  const regionsCsv = fs.readFileSync("./data/region.csv", "utf8");
  const popuTsv = fs.readFileSync("./data/popu.tsv", "utf8");
  const regions = d3.csvParse(regionsCsv);
  const states = d3
    .tsvParse(popuTsv)
    .slice(1)
    .map((d) => {
      const data = {};
      data["state_name"] = d[""];
      timestamps.map((ts) => {
        data[ts] = +d[ts].replace(/,/g, "");
      });
      return data;
    });
  return [regions, states];
};

const sendDataToRedis = async () => {
  const [regions, states] = await readData();

  for (const region of regions) {
    await addRegionStream(region);
  }

  for (const state of states) {
    await addPopuStream(state);
  }

  console.log("write data to stream: done");
  redis.quit();
};

sendDataToRedis();
