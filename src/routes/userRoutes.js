import {
  createUser,
  getBest5Scores,
  getCurrentUser,
  login,
  logout,
} from "../controllers/userController.js";
import { getAllUsers } from "../services/userService.js";
import sendResponse from "../utils/sendResponse.js";

export const routes = {
  "/api/": {
    GET: (req, res) => {
      sendResponse(res, { data: "REST API is running", statusCode: 200 });
    },
  },
  "/api/users": {
    GET: async (req, res) => {
      const users = await getAllUsers();
      sendResponse(res, { data: users, statusCode: 200 });
    },
    POST: async (req, res) => {
      await createUser(req, res);
    },
  },
  "/api/login": {
    POST: async (req, res) => {
      await login(req, res);
    },
  },
  "/api/logout": {
    POST: (req, res) => {
      logout(req, res);
    },
  },
  "/api/leaderboard": {
    GET: async (req, res) => {
      await getBest5Scores(req, res);
    },
  },
  "/api/current-user": {
    GET: (req, res) => {
      getCurrentUser(req, res);
    },
  },
};
