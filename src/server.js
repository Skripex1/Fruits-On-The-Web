import http from "http";
import url from "url";
import { routes } from "./routes/userRoutes.js";
import logger from "./middlewares/logger.js";
import { getStaticFilePath } from "./utils/staticFilePath.js";
import fs from "fs/promises";
import { serveFile } from "./utils/fileManager.js";
import { staticNotFound, routeNotFound } from "./utils/404.js";

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith("/api")) {
    const apiPath = req.url.replace("/api", "");
    const method = req.method.toUpperCase();

    let handler = routes[apiPath] && routes[apiPath][method];

    if (handler) {
      handler(req, res);
    } else {
      routeNotFound(res);
    }
  } else {
    const { filePath, contentType } = getStaticFilePath(req.url);

    try {
      await serveFile(filePath, contentType, res);
    } catch (error) {
      console.error(`File not found: ${filePath}`);
      staticNotFound(res);
    }
  }
});

server.on("request", logger);

server.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
