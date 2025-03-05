
import { body, param } from 'express-validator';

// Validation pour la création d'un feedback
export const validateCreateFeedback = [
    body('utilisateur_id')
        .notEmpty()
        .withMessage('L\'ID de l\'utilisateur est requis')
        .isInt()
        .withMessage('L\'ID de l\'utilisateur doit être un nombre entier'),

    body('evenement_id')
        .notEmpty()
        .withMessage('L\'ID de l\'événement est requis')
        .isInt()
        .withMessage('L\'ID de l\'événement doit être un nombre entier'),

    body('note')
        .notEmpty()
        .withMessage('La note est requise')
        .isInt({ min: 0, max: 5 })
        .withMessage('La note doit être un nombre entier entre 0 et 5'),

    body('commentaire')
        .optional()
        .isString()
        .withMessage('Le commentaire doit être une chaîne de caractères')
        .isLength({ max: 500 })
        .withMessage('Le commentaire ne doit pas dépasser 500 caractères')
];

// Validation pour la récupération d'un feedback par ID
export const validateFeedbackId = [
    param('id')
        .notEmpty()
        .withMessage('L\'ID du feedback est requis')
        .isInt()
        .withMessage('L\'ID du feedback doit être un nombre entier')
];

// Middleware de validation des erreurs
export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            message: "Erreur de validation",
            errors: errors.array() 
        });
    }
    next();
};
