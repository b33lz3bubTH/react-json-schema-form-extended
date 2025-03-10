

import express, { json, urlencoded } from "express";
import { config } from "./config";
import { ControllerInit } from "./controllers";
const port = config.PORT;
const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(...ControllerInit());
// Global handler for uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});
app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
