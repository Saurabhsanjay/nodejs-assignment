const User = require("../models/sql_models/user.model");
const mongoUser = require("../models/mongodb_models/user.model");
const bcrypt = require("bcrypt");
const { redisClient } = require("../db/connection");
const userService = require("../services/user.service");

// for creating a new user using Sequelize & mongo
async function createUser(req, res) {
  const { firstName, lastName, address, city, email, password } = req.body;
  const result = await userService.createUser(
    firstName,
    lastName,
    address,
    city,
    email,
    password
  );

  if (result.error) {
    res.status(400).json({ error: result.error });
  } else {
    res.status(201).json(result);
  }
}

//for getting the alluserslist
async function getUsers(req, res) {
  try {
    redisClient.get("users", async (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to fetch users" });
      }

      if (result) {
        const users = JSON.parse(result);
        return res.send({ users });
      }

      const sqlUsers = await User.findAll();
      const mongoUsers = await mongoUser.find();
const users=[...sqlUsers,...mongoUsers]
      redisClient.setex("users", 10, JSON.stringify(users), (err) => {
        if (err) {
          console.error(err);
        }
      });

      res.send(users);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}

//for deleting the user
async function deleteUser(req, res) {
  try {

    const { id } = req.params;
    
    await userService.deleteUser(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
}

//for searching the users
async function searchUsers(req, res) {
  try {
    const { searchTerm } = req.query;
    if (!searchTerm) {
      return res.status(400).json({ error: "Search term is required" });
    }

    const sqlUsers = await userService.searchUsersSql(searchTerm);
    const mongooseUsers = await userService.searchUsersMongoose(searchTerm);

    const users = [...sqlUsers, ...mongooseUsers];
    if (users.length === 0) {
      return res
        .status(404)
        .json({ error: "No users found with the given search term" });
    }
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ error: "Failed to search users" });
  }
}

module.exports = { createUser, getUsers, deleteUser, searchUsers };
