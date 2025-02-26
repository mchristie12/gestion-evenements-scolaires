// 1. On importe les modules installés
import express from "express"; 
import bodyParser from "body-parser"; 
import compression from "compression"; 
import helmet from "helmet"; 
import cors from "cors"; 
import dotenv from "dotenv"; 
import database from "./config/connection.js";

// 2. On importe la configuration de connexion à la base de données
import connection from "./config/connection.js";

// 3. On importe les routes
import NotificationRoute from "./routes/NotificationRoute.js"; // ✅ Ajout de la route

// 4. On teste la connexion à la base de données
const testDatabaseConnection = async () => {
  try {
    await connection.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  }
};
database.sync({ alter: true })

// 5. On crée un serveur
const app = express();
app.use(express.json());
 
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

// 6. On ajoute les routes
app.use("/api/notifications", NotificationRoute); // ✅ Ajout de la route

// 7. On démarre le serveur avec le numéro de port importé depuis le fichier de config (.env)
const PORT = dotenv.config().parsed.PORT || 3000; // ✅ Ajout d'une valeur par défaut
testDatabaseConnection();
app.listen(PORT, () => {
  console.info("Serveur démarré:");
  console.info("http://localhost:" + PORT);
});
