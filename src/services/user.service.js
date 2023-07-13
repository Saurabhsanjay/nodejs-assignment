const User = require("../models/sql_models/user.model");
const mongoUser = require("../models/mongodb_models/user.model");
const bcrypt = require("bcrypt");
const { redisClient } = require("../db/connection");
const { Op } = require("sequelize");

//create new user service
async function createUser(firstName, lastName, address, city, email, password) {
  try {
    // Check if the email already exists in either Sequelize or MongoDB
    const existingUser = await User.findOne({ where: { email } });
    const existingMongoUser = await mongoUser.findOne({ email });
    if (existingUser || existingMongoUser) {
      return { error: "Email already exists" };
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user in Sql
    const newUser = await User.create({
      firstName,
      lastName,
      address,
      city,
      email,
      password: hashedPassword,
    });

    // Create a new user in MongoDB
    const newMongoUser = await mongoUser.create({
      firstName,
      lastName,
      address,
      city,
      email,
      password: hashedPassword,
    });

    // check if data is available
    redisClient.get("users", async (err, result) => {
      if (err) {
        console.error(err);
      }

      let cachedUsers = [];
      if (result) {
        cachedUsers = JSON.parse(result);
      }

      // Add the new user to the cached users
      cachedUsers.push(newUser);
      cachedUsers.push(newMongoUser);

      // Update the Redis cache with the updated users
      redisClient.set("users", JSON.stringify(cachedUsers));
    });

    return { newUser, newMongoUser };
  } catch (error) {
    console.error("Error creating user:", error);
    return { error: "Failed to create user" };
  }
}

//proxy api 
//payment api and 1 cr rupees=> 
//attackers
//api secure 


//render =>512mb 512mb use
//database =>mongodb 

//get all users service 
const NodeCache = require("node-cache");
const userCache = new NodeCache({ stdTTL: 60 });

async function getUsers() {
  try {
    const cachedUsers = await new Promise((resolve, reject) => {
      redisClient.get("users", (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });

    if (cachedUsers) {
      console.log("get from cache");
      return JSON.parse(cachedUsers);
    }

    const sqlUsers = await User.findAll();
    const mongoUsers = await mongoUser.find();

    const users = [...sqlUsers, ...mongoUsers];

    redisClient.set("users", JSON.stringify(users),"EX",30);
    console.log("set cache");

    return users;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch users");
  }
}




//delete user service
async function deleteUser(id) {
  try {
    const sqlUser = await User.findOne({ where: { id: id } });

   
    if (sqlUser) {
      await User.destroy({ where: { id: id } });
    } else {
   
      await mongoUser.deleteOne({ _id: id });
    }

    // Invalidate the cached users data
    redisClient.del("users");
  } catch (error) {
    throw new Error("Failed to delete user");
  }
}

//for  sql searching
async function searchUsersSql(searchTerm) {
  try {
    const cachedResults = await new Promise((resolve, reject) => {
      redisClient.get(searchTerm, (err, result) => {
        if (err) {
          console.error("Error retrieving cached search results:", err);
          reject(err);
        } else {
          resolve(JSON.parse(result) || null);
        }
      });
    });

    if (cachedResults) {
      console.log("Cahced",cachedResults)
      return cachedResults;
    }

    const sequelizeUsers = await User.findAll({
      where: {
        [Op.or]: [
          { firstName: { [Op.like]: `%${searchTerm}%` } },
          { lastName: { [Op.like]: `%${searchTerm}%` } },
          { email: { [Op.like]: `%${searchTerm}%` } },
        ],
      },
    });
    redisClient.set(searchTerm, JSON.stringify(sequelizeUsers));
    return sequelizeUsers;
  } catch (error) {
    console.error("Error searching users with Sequelize:", error);
    throw new Error("Failed to search users with Sequelize");
  }
}

//for searching the mongousers
async function searchUsersMongoose(searchTerm) {
  try {
    const cachedResults = await new Promise((resolve, reject) => {
      redisClient.get(searchTerm, (err, result) => {
        if (err) {
          console.error("Error retrieving cached search results:", err);
          reject(err);
        } else {
          resolve(JSON.parse(result) || null);
        }
      });
    });

    if (cachedResults) {
      return cachedResults;
    }

    const mongooseUsers = await mongoUser.find({
      $or: [
        { firstName: { $regex: searchTerm, $options: "i" } },
        { lastName: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
      ],
    });

    redisClient.set(searchTerm, JSON.stringify(mongooseUsers));

    return mongooseUsers;
  } catch (error) {
    console.error("Error searching users with Mongoose:", error);
    throw new Error("Failed to search users with Mongoose");
  }
}

module.exports = {
  createUser,
  getUsers,
  deleteUser,
  searchUsersMongoose,
  searchUsersSql,
};
