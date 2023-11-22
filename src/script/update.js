import { redis, readPopuStream, POPU_STREAM } from "../be/redis.js";

const main = async () => {
  const state = "Kansas";
  const timestamp = "1990";
  const population = "10000000";

  await redis.xadd(
    POPU_STREAM,
    "*",
    "state_name",
    state,
    timestamp,
    population,
  );
  await redis.quit();
  console.log("done");
};

main().then(() => {
  process.exit(0);
});
