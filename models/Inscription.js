// 1. Importation de la base de données et des types de données Sequelize
import database from "../config/connection.js";
import { DataTypes } from "sequelize";
import Utilisateur from "./Utilisateur.js";
import Evenement from "./Evenement.js";

// 2. Définition du modèle "Inscription"
const Inscription = database.define('Inscription', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },

    /* utilisateur_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: {
            model: Utilisateur, 
            key: 'id'
        },
        onDelete: 'CASCADE'
    },

    /*evenement_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: {
            model: Evenement, 
            key: 'id_evenement'
        },
        onDelete: 'CASCADE'
    },
    */

    date_inscription: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW
    },

    statut: { 
        type: DataTypes.ENUM('confirmée', 'annulée', 'en attente'),
        defaultValue: 'en attente'
    },

    presence: { 
        type: DataTypes.ENUM('présent', 'absent', 'non marqué'),
        defaultValue: 'non marqué'
    },
    
    historique: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false
    }
}, {
    timestamps: true, // Active createdAt et updatedAt
    tableName: 'inscriptions'
});


// 4. Exportation du modèle "Inscription"
export default Inscription;
