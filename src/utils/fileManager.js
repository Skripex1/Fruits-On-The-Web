import fs from "fs/promises";
import { fileURLToPath } from "url";
import * as path from "path";
import timeoutPromise from "./timeoutPromise.js";
import { staticNotFound } from "./404.js";

const fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileName);
const filePath = path.join(__dirname, "..", "..", "database", "database.json");

export const readFromFile = async () => {
  try {
    const rawDataPromise = fs.readFile(filePath);
    const rawData = await timeoutPromise(rawDataPromise, 5000);
    const fomattedData = JSON.parse(rawData) || [];
    return fomattedData;
  } catch (error) {
    console.log("Error reading the database", error);
    return [];
  }
};

export const writeToFile = async (data) => {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, jsonData);
  } catch (error) {
    console.error("Error writing to file", error);
  }
};

export const appendToFile = async (newUser) => {
  try {
    const existingData = await readFromFile();
    existingData.push(newUser);
    await writeToFile(existingData);
  } catch (error) {
    console.error("Error appending to file", error);
  }
};

export const serveFile = async (filePath, contentType, response) => {
  try {
    const isBinary = contentType.startsWith("image/");
    const data = await fs.readFile(filePath, isBinary ? null : "utf8");
    response.writeHead(200, { "Content-Type": contentType });
    response.end(data, isBinary ? "binary" : "utf8");
  } catch (err) {
    console.error(err);
    staticNotFound(response);
  }
};

export const updateUserScore = async (username, newScore) => {
  try {
    const data = await readFromFile();
    const user = data.find((user) => user.username === username);

    if (user) {
      user.lastScore = newScore;
      if (newScore > user.highestScore) {
        user.highestScore = newScore;
      }
      await writeToFile(data);
      console.log(`Updated scores for user: ${username}`);
      return true;
    } else {
      console.log(`User with username: ${username} not found.`);
      return false;
    }
  } catch (error) {
    console.error("Error updating user score", error);
    return false;
  }
};
