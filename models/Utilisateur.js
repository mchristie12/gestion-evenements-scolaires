import database from "../config/connection.js"; // Connexion à la base de données
import { DataTypes } from "sequelize"; // Import des types Sequelize

const Utilisateur = database.define("Utilisateur", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false, // Nom requis
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Email unique
        validate: {
            isEmail: true, // Vérification du format email
        },
    },
    mot_de_passe: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date_inscription: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Date d'inscription par défaut
    },
});

export default Utilisateur;
