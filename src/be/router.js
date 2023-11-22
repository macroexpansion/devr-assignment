import {
  readPopuStream,
  readRegionStream,
  handlePopuStreamUpdate,
} from "./redis.js";
import { timestamps } from "../common.js";

export const getDataHandler = async (req, res) => {
  const states = await readPopuStream();
  const regions = await readRegionStream();

  res.json({
    keys: timestamps,
    states,
    regions,
  });
};

export const eventHandler = async (req, res) => {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  res.writeHead(200, headers);
  res.write(createEvent("ping", { success: true }));

  handlePopuStreamUpdate((data) => {
    console.log(data);
    const event = createEvent("update", data);
    res.write(event);
  });

  req.on("close", () => {
    console.log(`Connection closed`);
  });
};

const createEvent = (name, data) => {
  return `event: ${name}\ndata: ${JSON.stringify(data)}\n\n`;
};
