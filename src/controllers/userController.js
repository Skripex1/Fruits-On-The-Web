import { getAllUsers, getUserByUsername } from "../services/userService.js";
import sendResponse from "../utils/sendResponse.js";
import { appendToFile, writeToFile } from "../utils/fileManager.js";
import { createSession, setSessionCookie } from "../utils/sessionManager.js";

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
  try {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const { username, password } = JSON.parse(body);
      const user = await getUserByUsername(username);

      if (!user) {
        return sendResponse(res, {
          data: "User does not exist!",
          statusCode: 404,
        });
      }

      if (user.password !== password) {
        return sendResponse(res, {
          data: "Password is incorrect!",
          statusCode: 403,
        });
      }

      const sessionId = createSession(username);
      setSessionCookie(res, sessionId);

      res.writeHead(302, { Location: "/" });
      res.end();
    });
  } catch (error) {
    console.log("Error during login", error);
    return sendResponse(res, {
      data: "Internal Server Error",
      statusCode: 500,
    });
  }
};
