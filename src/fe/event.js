export const SSE = async (callback) => {
  const sse = new EventSource(
    `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/event`,
  );

  sse.addEventListener("ping", (event) => {
    const data = JSON.parse(event.data);
    console.log(data);
  });

  sse.addEventListener("update", (event) => {
    const data = JSON.parse(event.data);
    callback(data);
  });
};
