import { getSessionIdFromCookie, getSession } from "../utils/sessionManager.js";

export const authenticate = (req, res, next) => {
  const sessionId = getSessionIdFromCookie(req);
  const session = getSession(sessionId);
  console.log(
    `isAuthenticated check: sessionId=${sessionId}, session=${session}`
  );
  if (sessionId && session) {
    req.session = session;
    next();
  } else {
    const isLoginRequest =
      req.url === "/api/login" ||
      (req.url === "/api/users" && req.method.toUpperCase() === "POST");

    if (isLoginRequest) {
      next();
    } else {
      res.writeHead(302, { Location: "/login" });
      res.end();
    }
  }
};
