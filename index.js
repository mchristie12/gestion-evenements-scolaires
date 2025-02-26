// 1. On importe les modules installes
import express from "express"; // créer et gérer le serveur HTTP
import bodyParser from "body-parser"; // interpréter les données JSON et les formulaires
import compression from "compression"; // réduire la taille des réponses et optimiser les performances
import helmet from "helmet"; // renforcer la sécurité en ajoutant divers en-têtes HTTP
import cors from "cors"; // permettre ou restreindre les requêtes provenant d'autres domaines
import dotenv from "dotenv"; // charger les variables d'environnement depuis un fichier .env
import database from "./config/connection.js";
import { testConnection, syncDatabase } from './config/connection.js';
import FeedbacksRoute from './routes/FeedbacksRoute.js';

// 2. On importe la configuration de connexion à la base de données
import connection from "./config/connection.js";

// 3. On teste la connexion a la base de donnees
const testDatabaseConnection = async () => {
  try {
    await connection.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  }
};

// 5. On cree un server
const app = express();

// Ajout des middlewares
app.use(compression()); // Compression des réponses
app.use(helmet()); // Sécurité
app.use(cors()); // CORS
app.use(express.json()); // Remplace bodyParser.json()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Test de la connexion à la base de données au démarrage
await testConnection();
// Synchroniser les modèles avec la base de données
await syncDatabase();

// Utilisation des routes
app.use('/api', FeedbacksRoute);

// 9. On demarre le server avec le numero de port importe depuis le fichier de config (.env)
const PORT = process.env.PORT || 3000;
testDatabaseConnection();
app.listen(PORT, () => {
  console.info("Serveur démarré:");
  console.info("http://localhost:" + PORT);
});
