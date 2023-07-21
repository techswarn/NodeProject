const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const cors = require("cors");
const swaggerDocument = YAML.load("./swagger.yaml");
const bodyParser = require("body-parser");
const v8 = require("node:v8");
//const cacheControlMiddleware = require('./middleware/cacheControlMiddleware')

const app = express();
app.use(cors());
const memoryCheck = require("node:process");

app.get("/", (req, res) => {
  const memObj = memoryCheck.memoryUsage();
  for (const [key, value] of Object.entries(memObj)) {
    console.log(`Memory usage by ${key}, ${value / 1000000}MB `);
  }
  const rss = `${memObj.rss}` / 1000000;
  const heapTotal = `${memObj.heapTotal}` / 1000000;
  const heapUsed = `${memObj.heapUsed}` / 1000000;
  const external = `${memObj.external}` / 1000000;
  const arrayBuffers = `${memObj.arrayBuffers}` / 1000000;

  const data = v8.getHeapStatistics();
  console.log(data);
  res.send({ rss, heapTotal, heapUsed, external, arrayBuffers });
});
//Regular middlewares
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(bodyParser.urlencoded({ extended: false }));

//cookies and file middleware
app.use(cookieParser());
app.use(fileUpload());

//Middlewares
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(function (req, res, next) {
  //   res.set('Cache-control', 'public, max-age=300')
  res.set("Connection", "keep-alive");
  res.set("Content-Type", "text/event-stream");
  res.set("Cache-Control", "no-store, no-transform");
  res.set("X-Accel-Buffering", "no");
  res.set("Speak-of-the-devil", "I was just thinking about you!");
  next();
});

//Import all routes
const userRouter = require("./routes/userRouter");
const eventRouter = require("./routes/eventRouter");

//router middleware
app.use("/api/v1/users", userRouter);
app.use("/api/v1/event", eventRouter);

module.exports = app;
