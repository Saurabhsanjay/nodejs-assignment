const mongoose = require("mongoose");
const redis = require("ioredis");
const Sequelize = require("sequelize");
require("dotenv").config(".././.env");

//for connecting to mongoDB
async function connectToMongoDB() {
  try {
    const uri = process.env.MONGO_URI;

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(uri, options);

    console.log(`Connected to MongoDB`);

    return mongoose.connection;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
}
//mysql connection
const sequelize = new Sequelize(
  process.env.SQL_DB_NAME,
  process.env.SQL_DB_USERNAME,
  process.env.SQL_DB_PASSWORD,
  {
    host: process.env.SQL_DB_HOST,
    dialect: process.env.SQL_DB_DIALECT,
    logging: false,
  }
);

//redis connection

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  // password: process.env.REDIS_PASSWORD,
});

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (error) => {
  console.error("Error connecting to Redis: " + error);
});

module.exports = {
  redisClient,
  sequelize,
  connectToMongoDB,
};
