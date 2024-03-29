require("dotenv").config({ path: ".env" });
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

const { globalErrorHandler } = require("./utils/error");

const { PORT, APP_ENV, MINIMUM_VERSION } = require("./config.js");

require("./mongo");

// Put together a schema
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
  app.use(cors({ origin: ["http://127.0.0.1:8080", "http://127.0.0.1:5500"], credentials: true })); // change to your host url
}

app.use(express.static(__dirname + "/../public"));
// Pre middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.text({ type: ["json", "text"] }));
app.use(helmet());
app.use(cookieParser());

// Routes
app.use("/user", require("./controllers/user"));
app.use("/", require("./controllers/result"));

const now = new Date().toISOString();

app.get("/", async (req, res) => {
  res.send(`Hello World at ${now}`);
});

// Post middleware
require("./passport")(app);

// Start the server
app.listen(PORT, () => console.log(`RUN ON PORT ${PORT}`));

app.use(globalErrorHandler);

module.exports = app;
