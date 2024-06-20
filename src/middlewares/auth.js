import { getSessionIdFromCookie, getSession } from "../utils/sessionManager.js";

export const isAuthenticated = (req) => {
  const sessionId = getSessionIdFromCookie(req);
  const session = getSession(sessionId);
  console.log(
    `isAuthenticated check: sessionId=${sessionId}, session=${JSON.stringify(
      session
    )}`
  );
  return session ? true : false;
};
