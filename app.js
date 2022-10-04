const express = require("express");
const morgan = require("morgan");
const tourRoutes = require("./routes/tourRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

/**
 * Middleware
 */
app.use(express.json());
app.use(morgan("dev"));

// global middleware
app.use((req, res, next) => {
  console.log(`Hello from middleware`);
  next();
});

/**
 * Routes
 */
app.use("/api/v1/tours", tourRoutes);
app.use("/api/v1/users", userRoutes);

/**
 * server
 */
const port = 3000;
app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
