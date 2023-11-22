import * as d3 from "d3";

import { getData, createChart } from "./src/fe";
import { delay } from "./src/utils";

const main = async () => {
  const data = await getData();

  const chart = createChart(data);
  app.append(chart);

  const indexes = d3.range(data.keys.length);
  for (const index of indexes) {
    await delay(500);
    chart.update(index, 2500);
  }
};

main().then(() => {
  console.log("ok");
});
