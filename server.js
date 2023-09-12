const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cors = require("cors");
const compression = require("compression");
const globalError = require("./middleware/errorMiddleware");

dotenv.config({ path: "config.env" });
const authorsRoute = require("./routes/authorsRoute");
const categoryRoute = require("./routes/categoryRoute");
const tagRoute = require("./routes/tagRoute");
const postRoute = require("./routes/postRoute");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute ");
const commentRoute = require("./routes/commentRoute");

// Connect with db
mongoose
  .connect(process.env.DB_URL)
  .then((conn) => {
    console.log(`Database connected:${conn.connection.host}`);
  })
  .catch((err) => {
    console.log(`Database Error: ${err}`);
    process.exit();
  });

const app = express();

app.use(cors());
app.options("*", cors());

//Compress all req and res for me
app.use(compression());

//Middlewares
app.use(express.json({ limit: "20kb" })); ///jsonبحولهاالى bodyبتحول كل النصوص الي جايه من
app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
  console.log(`mode : ${process.env.NODE_ENV}`);
}

app.use(mongoSanitize());
app.use(xss());

app.get("/", (req, res) => {
  res.send("Ouer Api");
});

app.use("/api/v1/authors", authorsRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/tag", tagRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/comment", commentRoute);

app.use(globalError);

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

// Handle rejection outside exprees
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Errors: ${err.name}|${err.message}`);
  server.close(() => {
    console.error(`Shutting down...`);
    process.exit(1);
  });
});
