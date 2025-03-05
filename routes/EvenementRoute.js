import { Router } from "express";
import {
  addEvenement, // Ajouter un événement
  getEvenements, // Récupérer tous les événements
  updateEvenement, // Modifier un événement
  deleteEvenement, // Supprimer un événement
  getEvenementById, // Afficher un seul événement
} from "../controllers/EvenementCTRL.js";

import evenementValidation from "../validations/EvenementValidation.js";
//import autoriser from "../authentification/autorisation.js";
//import { verifierToken } from "../authentification/verifierToken.js";

// 1. Création du routeur "evenementRouter"
const EvenementRoute = Router();

// 2. Protéger toutes les routes avec un token et autoriser certains rôles
//.all("*", verifierToken) // Protection par token
//.all("*", autoriser(["admin", "organisateur"])) // Seuls les admins et organisateurs peuvent gérer les événements
EvenementRoute.get("/", getEvenements) // Récupérer tous les événements
  .post("/", evenementValidation, addEvenement) // Ajouter un événement
  .delete("/:id_evenement", evenementValidation, deleteEvenement) // Supprimer un événement
  .put("/:id_evenement", evenementValidation, updateEvenement) // Modifier un événement
  .get("/:id_evenement", getEvenementById); // Afficher un événement par son ID

// 3. Exporter la route "evenementRouter"

export default EvenementRoute;
