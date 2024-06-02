import { createUser } from "../controllers/userController.js";
import { getAllUsers } from "../services/userService.js";
import sendResponse from "../utils/sendResponse.js";

export const routes = {
  "/": {
    GET: (req, res) => {
      sendResponse(res, { data: "REST API is running", statusCode: 200 });
    },
  },
  "/users": {
    GET: async (req, res) => {
      const users = await getAllUsers();
      sendResponse(res, { data: users, statusCode: 200 });
    },
    POST: (req, res) => {
      createUser(req, res);
    },
  },
};
