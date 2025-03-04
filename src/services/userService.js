import { readFromFile } from "../utils/fileManager.js";

const getAllUsers = async () => {
  const data = await readFromFile();
  const users = Object.values(data);
  console.log(users);
  return users;
};

const getUserById = async (id) => {
  try {
    const users = await getAllUsers();
    return users.find((user) => user.id === Number(id));
  } catch (error) {
    console.log(`Can not find user with id : ${id}`, error);
    return null;
  }
};

const getUserByUsername = async (username) => {
  try {
    const users = await getAllUsers();
    return users.find((user) => user.username === username);
  } catch (error) {
    console.log(`Can not find user with username : ${username}`, error);
    return null;
  }
};

const getUserByEmail = async (email) => {
  try {
    const users = await getAllUsers();
    return users.find((user) => user.email === email);
  } catch (error) {
    console.log(`Can not find user with the email ${email}`);
  }
};

export { getAllUsers, getUserById, getUserByUsername, getUserByEmail };
