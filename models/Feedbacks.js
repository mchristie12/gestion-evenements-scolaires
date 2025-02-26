// 1. On importe la base de données et le DataTypes
import database from "../config/connection.js"; // connexion à la base de données
import { DataTypes } from "sequelize"; // Import des types de données Sequelize

// 2. On crée le modèle "Feedbacks" dans la base de données avec ses attributs
const Feedback = database.define('Feedback', {
  // Définition des colonnes de la table feedbacks
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  utilisateur_id: {
    type: DataTypes.INTEGER,
    allowNull: false,  // cette colonne ne peut pas être vide
  },
  evenement_id: {
    type: DataTypes.INTEGER,
    allowNull: false,  // cette colonne ne peut pas être vide
  },
  note: {
    type: DataTypes.INTEGER,
    allowNull: false,  // cette colonne ne peut pas être vide
    validate: {
      min: 0,
      max: 5,  // Note entre 0 et 5
    },
  },
  commentaire: {
    type: DataTypes.TEXT,
    allowNull: true,  // la colonne peut être nulle
  },
  date_soumission: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,  // par défaut, c'est la date et l'heure actuelles
  },
}, {
  // 3. Options supplémentaires
  tableName: 'feedbacks',  // Le nom de la table dans la base de données
  timestamps: true, // Si tu n'as pas besoin des colonnes `createdAt` et `updatedAt`
});

// 4. On exporte le modèle "Feedbacks" pour l'utiliser dans le contrôleur
export default Feedback;
