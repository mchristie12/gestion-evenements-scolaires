
// Importation des dépendances
import { Router } from "express";
import {
    creerInscription,
    obtenirToutesInscriptions,
    obtenirInscription,
    annulerInscription,
    mettreAJourPresence,
    obtenirHistoriqueInscriptions
} from "../controllers/InscriptionCTRL.js";

import {
    validateCreateInscription,
    validateGetInscriptionById,
    validateUpdatePresence,
    validateDeleteInscription,
    validateGetHistorique
} from "../validations/InscriptionValidation.js";



// Création du routeur "InscriptionRoute"
const inscriptionRoute = Router();

// Routes avec validation
inscriptionRoute
    .post("/", validateCreateInscription, creerInscription)  // Créer une inscription avec validation
    .get("/", obtenirToutesInscriptions)  // Obtenir toutes les inscriptions
    .get("/:id", validateGetInscriptionById, obtenirInscription)  // Obtenir une inscription spécifique
    .delete("/:id", validateDeleteInscription, annulerInscription)  // Annuler une inscription
    .put("/:id/presence", validateUpdatePresence, mettreAJourPresence)  // Mettre à jour la présence
    .get("/historique/:utilisateur_id", validateGetHistorique, obtenirHistoriqueInscriptions);  // Obtenir l'historique des inscriptions d'un utilisateur

// 4. On exporte la route "InscriptionRoute"
export default inscriptionRoute;


