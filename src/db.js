import { Sequelize, DataTypes } from "sequelize";

export const sequelize = new Sequelize("sqlite::memory:");

export const Todo = sequelize.define("Todo", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  description: DataTypes.STRING,
  status: DataTypes.ENUM("pending", "finished"),
});
