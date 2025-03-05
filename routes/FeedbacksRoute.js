

//export default FeedbacksRoute;
import { Router } from "express";
import { createFeedback, getAllFeedbacks, getFeedbackById } from "../controllers/FeedbacksCTRL.js"; // Importation des contrôleurs
import {validateCreateFeedback, validateFeedbackId} from "../validations/FeedbacksValidation.js";
// 2. On crée le router "FeedbacksRoute"
const feedbacksRoute = Router();

// 3. On écrit les routes pour les contrôleurs de "Feedback"

// Route pour créer un feedback
feedbacksRoute.post('/', validateCreateFeedback, createFeedback);

// Route pour récupérer tous les feedbacks
feedbacksRoute.get('/', getAllFeedbacks);

// Route pour récupérer un feedback spécifique par son ID
feedbacksRoute.get('/:id', validateFeedbackId, getFeedbackById);

// 4. On exporte la route "FeedbacksRoute"
export default feedbacksRoute;