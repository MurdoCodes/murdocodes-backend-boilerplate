import { createServer } from "./server";

const server = createServer();

let APP_PORT = 3000;

server.listen(APP_PORT, () => {
  console.log(`API running on ${APP_PORT}`);
});
