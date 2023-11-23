import * as d3 from "d3";

export const getData = async () => {
  const response = await fetch(
    `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/data`,
  );
  const { keys, states, regions } = await response.json();

  const regionByState = new Map(regions.map((d) => [d.State, d.Region]));
  const divisionByState = new Map(regions.map((d) => [d.State, d.Division]));
  return {
    keys,
    group: d3.group(
      states,
      (d) => regionByState.get(d.name),
      (d) => divisionByState.get(d.name),
    ),
  };
};
