import express from "express";
import Joi from "joi";

import { Todo } from "./db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const todos = await Todo.findAll();

  res.render("todo-list.njk", { pageTitle: "Minhas tarefas", todos });
});

router.get("/create", (req, res) => {
  res.render("todo-form.njk", { pageTitle: "Criar nova tarefa", saveUrl: "/" });  
});

router.post("/", async (req, res) => {
  const schema = Joi.object({
    description: Joi.string().required(),
    status: Joi.string().valid("pending", "finished").required(),
  });

  const { error } = schema.validate(req.body, { allowUnknown: true });

  if (error) {
    return res.render(
      "todo-form.njk",
      {
        pageTitle: "Criar nova tarefa",
        saveUrl: `/${todo.id}`,
        errors: error.details.map(({ message }) => message)
      }
    );  
  }

  const todo = await Todo.create({
    description: req.body.description,
    status: req.body.status,
  });

  res.redirect(`/${todo.id}`);
});

router.get("/:todoId", async (req, res) => {
  const todo = await Todo.findByPk(req.params.todoId);

  if (! todo) return res.redirect("/");

  res.render("todo-form.njk", { pageTitle: "Editar tarefa", saveUrl: `/${todo.id}?_method=PUT`, todo });  
});

router.put("/:todoId", async (req, res) => {
  const todo = await Todo.findByPk(req.params.todoId);

  if (! todo) return res.redirect("/" + todo.id);

  const schema = Joi.object({
    description: Joi.string().required(),
    status: Joi.string().valid("pending", "finished").required(),
  });

  const { error } = schema.validate(req.body, { allowUnknown: true });

  if (error) {
    return res.render(
      "todo-form.njk",
      {
        pageTitle: "Editar tarefa",
        saveUrl: `/${todo.id}?_method=PUT`,
        errors: error.details.map(({ message }) => message)
      }
    );  
  }

  todo.description = req.body.description;
  todo.status = req.body.status;

  await todo.save();

  res.redirect(`/${todo.id}`);
});

router.delete("/:todoId", async (req, res) => {
  await Todo.destroy({
    where: {
      id: req.params.todoId,
    }
  });

  res.redirect("/");
});

export default router;
