import { body } from "express-validator";

 const NotificationValidation = [
  body("utilisateur_id").isInt().withMessage("L'ID de l'utilisateur est requis et doit être un entier"),
  body("evenement_id").optional().isInt().withMessage("L'ID de l'événement doit être un entier"),
  body("message").notEmpty().withMessage("Le message est obligatoire"),
  body("type_notification").isIn(["rappel", "inscription", "annulation"]).withMessage("Type de notification invalide"),
];
export default NotificationValidation
