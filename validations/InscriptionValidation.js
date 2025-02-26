import { body, param } from "express-validator";

// Validation pour la création d'une inscription
export const validateCreateInscription = [
    body("utilisateur_id")
        .notEmpty().withMessage("L'ID de l'utilisateur est requis")
        .isInt().withMessage("L'ID de l'utilisateur doit être un nombre entier"),

    body("evenement_id")
        .notEmpty().withMessage("L'ID de l'événement est requis")
        .isInt().withMessage("L'ID de l'événement doit être un nombre entier"),

    body("statut")
        .optional()
        .isIn(["confirmée", "annulée", "en attente"]).withMessage("Le statut doit être 'confirmée', 'annulée' ou 'en attente'"),

    body("presence")
        .optional()
        .isIn(["présent", "absent", "non marqué"]).withMessage("Le statut de présence doit être 'présent', 'absent' ou 'non marqué'"),

    body("historique")
        .optional()
        .isBoolean().withMessage("L'historique doit être un booléen (true ou false)")
];

// Validation pour récupérer une inscription par ID
export const validateGetInscriptionById = [
    param("id")
        .notEmpty().withMessage("L'ID de l'inscription est requis")
        .isInt().withMessage("L'ID de l'inscription doit être un nombre entier")
];

//  Validation pour mettre à jour la présence
export const validateUpdatePresence = [
    param("id")
        .notEmpty().withMessage("L'ID de l'inscription est requis")
        .isInt().withMessage("L'ID de l'inscription doit être un nombre entier"),

    body("presence")
        .notEmpty().withMessage("Le statut de présence est requis")
        .isIn(["présent", "absent", "non marqué"]).withMessage("Le statut de présence doit être 'présent', 'absent' ou 'non marqué'")
];

// Validation pour annuler une inscription
export const validateDeleteInscription = [
    param("id")
        .notEmpty().withMessage("L'ID de l'inscription est requis")
        .isInt().withMessage("L'ID de l'inscription doit être un nombre entier")
];

// Validation pour récupérer l'historique des inscriptions d'un utilisateur
export const validateGetHistorique = [
    param("utilisateur_id")
        .notEmpty().withMessage("L'ID de l'utilisateur est requis")
        .isInt().withMessage("L'ID de l'utilisateur doit être un nombre entier")
];
// on a ajouter
export default InscriptionValidation;

