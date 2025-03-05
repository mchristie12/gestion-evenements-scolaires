
import { Router } from "express";
import {
  createUtilisateur,
  getUtilisateurs,
  getUtilisateurById,
  updateUtilisateur,
  deleteUtilisateur,
} from "../controllers/UtilisateurCTRL.js";
import utilisateurValidation from "../validations/UtilisateurValidation.js";

// Création du router
const UtilisateurRoute = Router();

// Définition des routes
UtilisateurRoute.post("/", utilisateurValidation, createUtilisateur); // Créer un utilisateur
UtilisateurRoute.get("/", getUtilisateurs); // Lister tous les utilisateurs
UtilisateurRoute.get("/:id", getUtilisateurById); // Récupérer un utilisateur par ID
UtilisateurRoute.put("/:id", utilisateurValidation, updateUtilisateur); // Mettre à jour un utilisateur
UtilisateurRoute.delete("/:id", deleteUtilisateur); // Supprimer un utilisateur

// Exporter le router
export default UtilisateurRoute;
