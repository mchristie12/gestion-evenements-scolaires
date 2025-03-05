
import { body, param } from "express-validator";
//import Utilisateur from "../models/Utilisateur";

 //import { body } from "express-validator";

const utilisateurValidation = [
  body('prenom')
    .notEmpty().withMessage('Le prénom est requis')
    .isLength({ max: 100 }).withMessage('Le prénom ne doit pas dépasser 100 caractères'),

  body('nom')
    .notEmpty().withMessage('Le nom est requis')
    .isLength({ max: 100 }).withMessage('Le nom ne doit pas dépasser 100 caractères'),

  body('email')
    .notEmpty().withMessage('L\'email est requis')
    .isEmail().withMessage('Email invalide')
    .isLength({ max: 255 }).withMessage('L\'email ne doit pas dépasser 255 caractères'),

  body('mot_de_passe')
    .notEmpty().withMessage('Le mot de passe est requis')
    .isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),

  body('role')
    .notEmpty().withMessage('Le rôle est requis')
    .isIn(['participant', 'organisateur', 'admin']).withMessage('Rôle invalide'),

  body('methode_auth')
    .notEmpty().withMessage('La méthode d\'authentification est requise')
    .isIn(['email', 'google', 'facebook']).withMessage('Méthode d\'authentification invalide'),
];

export default utilisateurValidation;
