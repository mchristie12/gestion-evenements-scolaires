// 1. On importe les modules installes

// 1. Importation des modules
import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";

// Importer la connexion à la base de données
import database from "./config/connection.js";

import connection from "./config/connection.js";


// Importer les routes utilisateur
import UtilisateurRoute from "./routes/UtilisateurRoute.js";

// 2. Charger les variables d'environnement
//dotenv.config();

// 3. Tester la connexion à la base de données
const testDatabaseConnection = async () => {
  try {
    await database.authenticate();
    console.log("Connexion à la base de données réussie.");
  } catch (error) {
    console.error("Erreur de connexion à la base de données:", error.message);
  }
};

database.sync({ alter: true });

// 4. Création du serveur
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// 5. Utilisation des routes
app.use("/api/utilisateur", UtilisateurRoute);

// 6. Démarrage du serveur
//const PORT = process.env.PORT || 3000;
//testDatabaseConnection();

//app.listen(PORT, () => {
 // console.info("Serveur démarré:");
 // console.info("http://localhost:" + PORT);
//});

app.use("/api/utilisateur", UtilisateurRoute);


const PORT = dotenv.config().parsed.PORT;
testDatabaseConnection();
app.listen(PORT, () => {
  console.info("Serveur démarré:");
  console.info("http://localhost:" + PORT);
});



