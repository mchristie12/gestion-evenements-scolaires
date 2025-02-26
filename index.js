// 1. On importe les modules installes
import express from "express"; // créer et gérer le serveur HTTP
import bodyParser from "body-parser"; // interpréter les données JSON et les formulaires
import compression from "compression"; // réduire la taille des réponses et optimiser les performances
import helmet from "helmet"; // renforcer la sécurité en ajoutant divers en-têtes HTTP
import cors from "cors"; // permettre ou restreindre les requêtes provenant d'autres domaines
import dotenv from "dotenv"; // charger les variables d'environnement depuis un fichier .env
import database from "./config/connection.js";

// 2. On importe la configuration de connexion à la base de données
import connection from "./config/connection.js";
import EvenementRoute from "./routes/EvenementRoute.js";

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
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 6. on importe les routes
app.use("/api/evenement", EvenementRoute);

// 9. On demarre le server avec le numero de port importe depuis le fichier de config (.env)
const PORT = dotenv.config().parsed.PORT;
testDatabaseConnection();
app.listen(PORT, () => {
  console.info("Serveur démarré:");
  console.info("http://localhost:" + PORT);
});
