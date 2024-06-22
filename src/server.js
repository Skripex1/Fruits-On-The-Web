import http from "http";
import url from "url";
import { routes } from "./routes/userRoutes.js";
import logger from "./middlewares/logger.js";
import { getStaticFilePath } from "./utils/staticFilePath.js";
import { serveFile } from "./utils/fileManager.js";
import { staticNotFound, routeNotFound } from "./utils/404.js";
import { authenticate } from "./middlewares/auth.js";
import {
  getSessionIdFromCookie,
  getSession,
  destroySession,
} from "./utils/sessionManager.js";

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const apiPath = parsedUrl.pathname;
  const method = req.method.toUpperCase();

  if (apiPath.startsWith("/api")) {
    const handler = routes[apiPath] && routes[apiPath][method];

    if (handler) {
      authenticate(req, res, () => handler(req, res));
    } else {
      routeNotFound(res);
    }
  } else {
    const sessionId = getSessionIdFromCookie(req);
    const session = getSession(sessionId);
    console.log(`Session username : ${JSON.stringify(session)}`);
    if (sessionId && session) {
      const { filePath, contentType } = getStaticFilePath(apiPath);
      try {
        await serveFile(filePath, contentType, res);
      } catch (error) {
        console.error(`File not found: ${filePath}`);
        staticNotFound(res);
      }
    } else {
      if (
        apiPath === "/login" ||
        apiPath === "/css/login.css" ||
        apiPath === "/javascript/userLogin.js" ||
        apiPath === "/javascript/modalFunctionality.js"
      ) {
        const { filePath, contentType } = getStaticFilePath(apiPath);
        try {
          await serveFile(filePath, contentType, res);
        } catch (error) {
          console.error(`File not found: ${filePath}`);
          staticNotFound(res);
        }
      } else {
        res.writeHead(302, { Location: "/login" });
        res.end();
      }
    }
  }
});

server.on("request", logger);

server.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
