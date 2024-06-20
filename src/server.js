import http from "http";
import url from "url";
import { routes } from "./routes/userRoutes.js";
import logger from "./middlewares/logger.js";
import { getStaticFilePath } from "./utils/staticFilePath.js";
import { serveFile } from "./utils/fileManager.js";
import { staticNotFound, routeNotFound } from "./utils/404.js";
import { isAuthenticated } from "./middlewares/auth.js";

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  console.log(`Request URL: ${req.url}`);

  const isApiRequest = req.url.startsWith("/api");
  const isLoginRequest =
    req.url === "/login" ||
    req.url === "/api/login" ||
    req.url.startsWith("/css/") ||
    req.url.startsWith("/javascript/");

  const authenticated = isAuthenticated(req);
  console.log(`Authenticated: ${authenticated}`);

  if (!authenticated && !isLoginRequest) {
    res.writeHead(302, { Location: "/login" });
    console.log("Redirecting to login");
    return res.end();
  }

  if (isApiRequest) {
    const apiPath = req.url.replace("/api", "");
    const method = req.method.toUpperCase();
    const handler = routes[apiPath] && routes[apiPath][method];

    if (handler) {
      console.log("Handling API request");
      handler(req, res);
    } else {
      routeNotFound(res);
    }
  } else {
    const { filePath, contentType } = getStaticFilePath(req.url);
    console.log(`Serving static file: ${filePath}`);

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
