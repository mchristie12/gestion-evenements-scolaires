// 1. On importe la base de donnee et le DataTypes
import database from "../config/connection.js";
import { DataTypes } from "sequelize";

// 2. On cree le model "Evenement" dans la base de donnees avec ses attributs
const Evenement = database.define("Evenement", {
  id_evenement: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  heure_debut: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  heure_fin: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  lieu: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  max_participants: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  /*organisateur_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Utilisateurs", // Nom du modèle de l'organisateur
      key: "id", // Clé primaire du modèle Utilisateurs
    },
  },*/
  statut: {
    type: DataTypes.ENUM("prévu", "annulé", "terminé"),
    allowNull: false,
    defaultValue: "prévu",
  },
  qr_code: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  date_creation: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

// 3. On exporte le model "Evenement" pour lui creer un controller
export default Evenement;
