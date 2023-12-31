# Redis Caching and Multiple Database Query Project

![Node.js](https://img.shields.io/badge/Node.js-v16.19.0-green)
![Redis](https://img.shields.io/badge/Redis-v7.0.1-red)
![Express](https://img.shields.io/badge/Express-v4.18.2-blue)
![Sequelize](https://img.shields.io/badge/Sequelize-v6.6.5-orange)
![Mongoose](https://img.shields.io/badge/Mongoose-v7.3.1-yellow)
![MongoDB](https://img.shields.io/badge/MongoDB-v6.0.0-green)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![AWS](https://img.shields.io/badge/AWS-yellow)

This repository contains the source code for a Node.js project that focuses on Redis caching and performing multiple database queries.

## Folder Structure

The folder structure of this project is organized as follows:

```

src
├── db
│   ├── controller
│   │   └── (controller files for handling requests and responses)
│   ├── middleware
│   │   └── (middleware files for handling the routes and server error)
│   ├── routes
│   │   └── (route files for defining API endpoints)
│   ├── services
│   │   └── (service files for implementing business logic)
│   ├── models
│   │   └── (model files for defining data schemas and interacting with databases)
│   └── (database connection configuration files)
└── (other source code files)

```

## API_ENDPOINTS 
```  
**BASE_URL** : http://localhost:8080

// create new user
POST {{BASE_URL}}/v1/users
{
   firstName:",
   lastName:",
   address:",
    city:",
    email:",
   password:",
}

// List all users
GET {{BASE_URL}}/v1/users

// Search users
GET {{BASE_URL}}/v1/users/search?searchTerm=saurabh

// Proxy request
GET {{BASE_URL}}/v1/proxy?location=akola



  ```

- **src**: This folder contains all the source code files for the project.
  - **db**: This folder contains the files related to the database operations.
    - **controller**: This folder contains the controller files responsible for handling requests and responses from the API.
    - **routes**: This folder contains the route files that define the API endpoints.
    - **services**: This folder contains the service files responsible for implementing the business logic.
    - **middlewares**: This folder contains the error handling files for the routes and server
    - **models**: This folder contains the model files that define the data schemas and interact with the databases.
  - *(other source code files)*: This folder may contain other necessary source code files for the project.
- *(other project files and configurations)*: This section represents any other files or configurations specific to your project.

Feel free to explore the respective folders to understand the project structure and modify the files as needed.

## Installation and Setup

To get the project up and running on your local machine, follow these steps:

1. Ensure you have [Node.js](https://nodejs.org)  installed on your system.
2. Clone this repository: `git clone https://github.com/Saurabhsanjay/nodejs-assignment.git`
3.
4. Install the dependencies: `npm install`
5. Configure the database connections and Redis settings in the appropriate configuration files located in the `src/db` folder.
6. Start the application: `npm start`

The application should now be running locally on your machine. You can access it by visiting `http://localhost:8080` in your web browser.



## Contact

If you want to contact me, you can reach me through below handles.

[![gmail](https://img.shields.io/badge/Saurabh_Ubale-FF0000?style=for-the-badge&logo=gmail&logoColor=white&labelColor=FF0000)](saurabhubale6501@gmail.com)

[![GitHub](https://img.shields.io/badge/Saurabh_Ubale-20232A?style=for-the-badge&logo=Github&logoColor=white)](https://github.com/Saurabhsanjay)

© 2023 Saurabh_Ubale