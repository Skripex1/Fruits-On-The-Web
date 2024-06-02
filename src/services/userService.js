import { readFromFile } from "../utils/fileManager.js";

const getAllUsers = async () => {
  const data = await readFromFile();
  const users = Object.values(data);
  return users;
};

const getUserById = async (id) => {
  try {
    const users = await getAllUsers();
    return users.find((user) => user.id === Number(id));
  } catch (error) {
    console.log(`Can not find user with id : ${id}`, error);
    return 0;
  }
};

export { getAllUsers, getUserById };
