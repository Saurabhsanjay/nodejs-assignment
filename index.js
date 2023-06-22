const {
  connectToMongoDB,
  sequelize,
  
} = require("./src/db/connection");
const colors = require("colors");
const express = require("express");


 const userRoutes = require("./src/routes/user.route");
 const proxyRoutes = require("./src/routes/proxy.route");
const morgan = require("morgan");
require("dotenv").config({ path: "./.env" });

const app = express();

// for Cross-Origin Resource Sharing (CORS)
const cors = require("cors");
const { handleRouteNotFound, errorHandler } = require("./src/middlewares/error-handler");

app.use(cors());
app.options("*", cors());

// for Parsing incoming JSON data
app.use(express.json());

// to Log HTTP requests in the console
app.use(morgan("dev"));

//app routes
 app.use("/v1", userRoutes);
 app.use("/v1", proxyRoutes);


 //error handlers
app.use(handleRouteNotFound);
app.use(errorHandler);


// Sync the model with the database
(async () => {
  try {
    await sequelize.sync();
    console.log('Sequelize Database synced');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();





// for Starting the server
const PORT = process.env.PORT || 3000;

  app.listen(PORT, async() => {
    await connectToMongoDB();
    console.log(`Server running on port ${PORT}`.bgBlue);
  });


