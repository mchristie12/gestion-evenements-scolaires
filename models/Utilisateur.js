import database from "../config/Connection.js";
import { DataTypes } from "sequelize";

const Utilisateur = database.define('Utilisateur', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nom: { type: DataTypes.STRING, allowNull: false },
    prenom: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    motDePasse: { type: DataTypes.STRING, allowNull: false },
}, {
    tableName: 'utilisateurs', // Définit le nom de la table
});

export default Utilisateur;
