import { getAllUsers, getUserByUsername } from "../services/userService.js";
import sendResponse from "../utils/sendResponse.js";
import { appendToFile, writeToFile } from "../utils/fileManager.js";
import {
  createSession,
  setSessionCookie,
  getSessionIdFromCookie,
  getSession,
  destroySession,
} from "../utils/sessionManager.js";

export const createUser = async (req, res) => {
  try {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const { username, email, password, confirm_password } = JSON.parse(body);
      if (password !== confirm_password) {
        return sendResponse(res, {
          data: "Passwords do not match!",
          statusCode: 409,
        });
      }

      const users = await getAllUsers();
      const found = users.find((user) => user.email === email);
      if (found) {
        return sendResponse(res, {
          data: "Email already in use!",
          statusCode: 409,
        });
      }

      const id = users.length + 1;
      const highestScore = 0;
      const latestScore = 0;

      const newUser = {
        id,
        username,
        email,
        password,
        latestScore,
        highestScore,
      };

      await appendToFile(newUser);

      return sendResponse(res, {
        data: "User created successfully!",
        statusCode: 201,
      });
    });
  } catch (error) {
    console.log("Error creating the account", error);
    return sendResponse(res, {
      data: "Internal Server Error",
      statusCode: 500,
    });
  }
};

export const login = async (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const { username, password } = JSON.parse(body);
    const user = await getUserByUsername(username);
    console.log(user);
    if (user && user.password === password) {
      const sessionId = createSession(username);
      setSessionCookie(res, sessionId);
      sendResponse(res, { data: "Login successful", statusCode: 200 });
    } else {
      sendResponse(res, { data: "Invalid credentials", statusCode: 401 });
    }
  });
};

export const getBest5Scores = async (req, res) => {
  try {
    const users = await getAllUsers();
    const sortedUsers = users.sort((a, b) => b.highestScore - a.highestScore);
    const top5Users = sortedUsers.slice(0, 5);
    return sendResponse(res, {
      data: top5Users,
      statusCode: 200,
    });
  } catch (error) {
    console.log("Error retrieving best 5 scores", error);
    return sendResponse(res, {
      data: "Internal Server Error",
      statusCode: 500,
    });
  }
};

export const logout = (req, res) => {
  const sessionId = getSessionIdFromCookie(req);
  if (sessionId) {
    destroySession(sessionId);
    res.writeHead(302, { Location: "/login" });
    res.end();
  } else {
    sendResponse(res, {
      data: "No active session found.",
      statusCode: 400,
    });
  }
};

export const getCurrentUser = (req, res) => {
  const sessionId = getSessionIdFromCookie(req);
  const session = getSession(sessionId);
  if (session) {
    sendResponse(res, { data: session });
  } else {
    sendResponse(res, {
      data: "No active session found.",
      statusCode: 400,
    });
  }
};
