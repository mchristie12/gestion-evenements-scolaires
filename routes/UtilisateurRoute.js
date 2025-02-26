import { Router } from "express";
import { createUtilisateur, getAllUtilisateurs, getUtilisateurById } from "../controllers/UtilisateurCTRL.js";
import utilisateurValidation from "../validations/UtilisateurValidation.js";

const UtilisateurRoute = Router();

// Route pour créer un utilisateur
UtilisateurRoute.post("/", createUtilisateur);

// Route pour récupérer tous les utilisateurs
UtilisateurRoute.get("/", getAllUtilisateurs);

// Route pour récupérer un utilisateur spécifique par son ID
UtilisateurRoute.get("/:id", getUtilisateurById);

export default UtilisateurRoute;
