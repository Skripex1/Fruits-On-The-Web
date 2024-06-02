import { getAllUsers } from "../services/userService.js";
import sendResponse from "../utils/sendResponse.js";
import { appendToFile, writeToFile } from "../utils/fileManager.js";

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
