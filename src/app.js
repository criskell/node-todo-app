import express from "express";
import nunjucks from "nunjucks";
import methodOverride from "method-override";

import { sequelize } from "./db.js";
import todoRouter from "./router.js";

const app = express();

await sequelize.sync();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  noCache: true,
});

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(todoRouter);

export default app;
