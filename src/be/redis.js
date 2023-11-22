import { Redis } from "ioredis";

export const POPU_STREAM = "popu";
export const REGION_STREAM = "region";

export const redis = new Redis({
  port: 6379,
  host: "127.0.0.1",
  username: "default",
  db: 0,
});

export const addRegionStream = async (region) => {
  const entries = Object.entries(region);
  const data = entries.flatMap((e) => [...e]);
  redis.xadd(REGION_STREAM, "*", ...data);
};

export const readRegionStream = async () => {
  const results = await redis.xread("block", 5000, "STREAMS", REGION_STREAM, 0);
  if (!results) {
    throw new Error("no data in stream");
  }
  const [key, messages] = results[0];

  const data = messages.map((e) => {
    const flatData = e[1];
    const entries = [];
    for (let i = 0; i < flatData.length; i = i + 2) {
      entries.push([flatData[i], flatData[i + 1]]);
    }

    return Object.fromEntries(entries);
  });

  return data;
};

export const addPopuStream = async (state) => {
  const { state_name, ...rest } = state;
  for (const item of Object.entries(rest)) {
    const data = [...Object.entries({ state_name }).flatMap((e) => e), ...item];
    redis.xadd(POPU_STREAM, "*", ...data);
  }
};

export const readPopuStream = async () => {
  const results = await redis.xread("block", 5000, "STREAMS", POPU_STREAM, 0);
  if (!results) {
    throw new Error("no data in stream");
  }
  const [key, messages] = results[0];

  const memo = {};
  messages.forEach((e) => {
    const flatData = e[1];
    const entries = [];
    for (let i = 0; i < flatData.length; i = i + 2) {
      if (flatData[i] == "state_name") {
        entries.push([flatData[i], flatData[i + 1]]);
      } else {
        entries.push([flatData[i], +flatData[i + 1]]);
      }
    }
    const obj = Object.fromEntries(entries);
    if (memo[obj.state_name]) {
      Object.assign(memo[obj.state_name], obj);
    } else {
      memo[obj.state_name] = obj;
    }
  });

  return Object.values(memo).map((e) => {
    const { state_name, ...rest } = e;
    return {
      name: state_name,
      values: Object.values(rest),
    };
  });
};
