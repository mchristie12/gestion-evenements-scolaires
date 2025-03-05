
// 1. On importe les modules installes
import express from "express"; // créer et gérer le serveur HTTP
import bodyParser from "body-parser"; // interpréter les données JSON et les formulaires
import compression from "compression"; // réduire la taille des réponses et optimiser les performances
import helmet from "helmet"; // renforcer la sécurité en ajoutant divers en-têtes HTTP
import cors from "cors"; // permettre ou restreindre les requêtes provenant d'autres domaines
import dotenv from "dotenv"; // charger les variables d'environnement depuis un fichier .env
import bcrypt from "bcryptjs";

// importer la connection de la base de données
import database from "./config/connection.js";

// 2. On importe la configuration de connexion à la base de données
import connection from "./config/connection.js";

// 2. On importe toutes les routes
import inscriptionRoute from "./routes/InscriptionRoute.js";
import utilisateurRoute from "./routes/UtilisateurRoute.js";  // Route des utilisateurs
import evenementRoute from "./routes/EvenementRoute.js";  // Route des événements
import feedbacksRoute from "./routes/FeedbacksRoute.js";  // Route des feedbacks
import notificationRoute from "./routes/NotificationRoute.js";  // Route des notifications


// 3. On teste la connexion a la base de donnees
const testDatabaseConnection = async () => {
  try {
    await connection.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  }
};

//database.sync({ alter: true })

// 5. On cree un server
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

// 9. On demarre le server avec le numero de port importe depuis le fichier de config (.env)
const PORT = dotenv.config().parsed.PORT;
testDatabaseConnection();
app.listen(PORT, () => {
  console.info("Serveur démarré:");
  console.info("http://localhost:" + PORT);
});

// Définition des routes
//app.use("/api/inscriptions", inscriptionRoute);
app.use("/api/utilisateurs", utilisateurRoute);  // Routes pour les utilisateurs
app.use("/api/evenements", evenementRoute);  // Routes pour les événements
app.use("/api/inscriptions", inscriptionRoute);  // Routes pour les inscriptions
app.use("/api/feedbacks", feedbacksRoute);  // Routes pour les feedbacks
app.use("/api/notifications", notificationRoute);  // Routes pour les notifications


app.get("/generateQR", async (req, res) => {
  try {
    const text = req.query.text || "https://example.com"; // Récupérer le texte depuis la requête
    const qrCodeDataUrl = await QRCode.toDataURL(text);
    res.json({ qrCodeDataUrl }); // Retourner l'image en format Base64
  } catch (err) {
    res.status(500).send("Erreur lors de la génération du QR Code");
  }
});

