import { body, param } from "express-validator";
//import Utilisateur from "../models/Utilisateur";

// Validation pour la création d'un utilisateur
 const utilisateurValidation = [
    body("nom")
        .notEmpty().withMessage("Le nom est requis.")
        .isString().withMessage("Le nom doit être une chaîne de caractères."),
    
    body("email")
        .notEmpty().withMessage("L'email est requis.")
        .isEmail().withMessage("L'email doit être valide."),
    
    body("mot_de_passe")
        .notEmpty().withMessage("Le mot de passe est requis.")
        .isLength({ min: 6 }).withMessage("Le mot de passe doit contenir au moins 6 caractères."),
];

// Validation pour la récupération d'un utilisateur par ID
export const validateUtilisateurId = [
    param("id")
        .notEmpty().withMessage("L'ID de l'utilisateur est requis.")
        .isInt().withMessage("L'ID de l'utilisateur doit être un nombre entier."),
];
export default utilisateurValidation;