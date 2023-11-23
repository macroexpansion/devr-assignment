import * as d3 from "d3";

import { SSE, getData, createChart } from "./src/fe";
import { delay } from "./src/utils";

const main = async () => {
  let data = await getData();
  let chart = createChart(data);
  app.append(chart);

  SSE((e) => {
    console.log(e);
    const index = data.keys.indexOf(+e.timestamp);
    getData().then((data) => {
      chart.update2(index, 2500, data, e);
    });
  });

  const indexes = d3.range(data.keys.length);
  for (const index of indexes) {
    chart.update(index, 2500);
  }
};

main().then(() => {
  console.log("ok");
});
