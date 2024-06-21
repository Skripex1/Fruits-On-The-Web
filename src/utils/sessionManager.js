import crypto from "crypto";

const sessions = {};

export const generateSessionId = () => {
  return crypto.randomBytes(16).toString("hex");
};

export const setSessionCookie = (res, sessionId) => {
  res.setHeader("Set-Cookie", `sessionId=${sessionId}; HttpOnly; Path=/`);
};

export const getSessionIdFromCookie = (req) => {
  const cookies =
    req.headers && req.headers.cookie ? req.headers.cookie.split(";") : [];
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === "sessionId") {
      return value;
    }
  }
  return null;
};

export const createSession = (username) => {
  const sessionId = generateSessionId();
  sessions[sessionId] = { username };
  console.log(`Created session: ${sessionId} -> ${username}`); // Debug
  return sessionId;
};

export const getSession = (sessionId) => {
  const session = sessions[sessionId];
  console.log(`Retrieved session: ${sessionId} -> ${session}`); // Debug
  return session;
};

export const destroySession = (sessionId) => {
  delete sessions[sessionId];
  console.log(`Destroyed session: ${sessionId}`); // Debug
};
