

import database from "../config/connection.js";
import { DataTypes } from "sequelize";

const Utilisateur = database.define('Utilisateur', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  prenom: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  telephone: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  mot_de_passe: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('participant', 'organisateur', 'admin'),
    allowNull: false,
  },
  derniere_connexion: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  methode_auth: {
    type: DataTypes.ENUM('email', 'google', 'facebook'),
    allowNull: false,
  },
  date_creation: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, 
  }
}, {
  timestamps: false, // Empêche Sequelize d'ajouter createdAt et updatedAt automatiquement
  tableName: 'utilisateurs',
});

export default Utilisateur;
