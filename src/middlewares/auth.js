import { getSessionIdFromCookie, getSession } from "../utils/sessionManager.js";

export const authenticate = (req, res, next) => {
  const sessionId = getSessionIdFromCookie(req);
  if (sessionId && getSession(sessionId)) {
    req.session = getSession(sessionId);
    next();
  } else {
    if (req.url !== "/login") {
      res.writeHead(302, { Location: "/login" });
      res.end();
    } else {
      next();
    }
  }
};

export const isAuthenticated = (req) => {
  const sessionId = getSessionIdFromCookie(req);
  return sessionId && getSession(sessionId);
};
