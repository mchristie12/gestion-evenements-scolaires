
//export default FeedbacksRoute;
import { Router } from "express";
import { createFeedback, getAllFeedbacks, getFeedbackById } from "../controllers/FeedbacksCTRL.js"; // Importation des contrôleurs

// 2. On crée le router "FeedbacksRoute"
const FeedbacksRoute = Router();

// 3. On écrit les routes pour les contrôleurs de "Feedback"

// Route pour créer un feedback
FeedbacksRoute.post('/feedback', createFeedback);

// Route pour récupérer tous les feedbacks
FeedbacksRoute.get('/feedbacks', getAllFeedbacks);

// Route pour récupérer un feedback spécifique par son ID
FeedbacksRoute.get('/feedback/:id', getFeedbackById);

// 4. On exporte la route "FeedbacksRoute"
export default FeedbacksRoute;
