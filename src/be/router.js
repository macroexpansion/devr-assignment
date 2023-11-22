import { readPopuStream, readRegionStream } from "./redis.js";
import { timestamps } from "../common.js";

export const getData = async (req, res) => {
  const states = await readPopuStream();
  const regions = await readRegionStream();

  res.json({
    keys: timestamps,
    states,
    regions,
  });
};
