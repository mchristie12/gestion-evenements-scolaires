import { body, param } from "express-validator";

const evenementValidation = [
  // Validation du titre
  body("titre")
    .exists()
    .withMessage("Le titre est obligatoire")
    .isString()
    .withMessage("Le titre doit être une chaîne de caractères")
    .isLength({ min: 3 })
    .withMessage("Le titre doit comporter au moins 3 caractères"),

  // Validation de la date (ISO8601)
  body("date")
    .exists()
    .withMessage("La date est obligatoire")
    .isISO8601()
    .withMessage("La date doit être au format ISO8601 (YYYY-MM-DD)"),

  // Validation de la description
  body("description")
    .optional()
    .isString()
    .withMessage("La description doit être une chaîne de caractères")
    .isLength({ max: 500 })
    .withMessage("La description ne peut pas dépasser 500 caractères"),

  // Validation de l'organisateur
  body("organisateurId")
    .exists()
    .withMessage("L'organisateur est obligatoire")
    .isInt({ min: 1 })
    .withMessage("L'identifiant de l'organisateur doit être un entier positif"),

  // Validation du type d'événement
  body("type")
    .exists()
    .withMessage("Le type d'événement est obligatoire")
    .isIn(["conférence", "atelier", "tournoi", "soirée", "autre"])
    .withMessage("Le type d'événement est invalide"),

  // Validation du nombre maximum de participants (optionnel)
  body("maxParticipants")
    .optional()
    .isInt({ min: 1 })
    .withMessage(
      "Le nombre maximum de participants doit être un entier positif"
    ),

  // Validation de l'ID pour les mises à jour / suppressions
  param("id")
    .optional()
    .isInt({ min: 1 })
    .withMessage("L'ID doit être un entier positif"),
];

export default evenementValidation;
