import express from "express";
import { login } from "../authentification/login.js"; // Importer la fonction login
import { body } from "express-validator"; // Pour la validation des entrées

const authRoute = express.Router();

// Validation des entrées avant d'appeler la fonction login
authRoute.post(
  "/login",
  [
    body("email").isEmail().withMessage("L'email est invalide"),
    body("mot_de_passe")
      .isLength({ min: 6 })
      .withMessage("Le mot de passe doit avoir au moins 6 caractères"),
  ],
  login // Fonction qui gère la connexion
);

export default authRoute;


