// 1. On importe la base de donnee et le DataTypes
import database from "../config/connection.js";
import { DataTypes } from "sequelize";

// 2. On cree le model "Notification" dans la base de donnees avec ses attributs
const Notification = database.define("Notification", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    utilisateur_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    evenement_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type_notification: {
      type: DataTypes.ENUM("rappel", "inscription", "annulation"),
      allowNull: false,
    },
    date_envoi: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    statut: {
      type: DataTypes.ENUM("non lu", "lu"),
      defaultValue: "non lu",
    },
  }, {
    timestamps: false,
    tableName: "notifications",
  });
// 3. On exporte le model "Notification" pour lui creer un controller
export default Notification;