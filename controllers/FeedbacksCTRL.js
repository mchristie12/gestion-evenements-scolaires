
// 1. On importe l'entité/model "Feedbacks"
import Feedbacks from "../models/Feedbacks.js";


// 2. Lister tous les feedbacks
export const getAllFeedbacks = async (req, res) => {
  try {
    // Récupérer tous les feedbacks de la table "feedbacks"
    const feedbacks = await Feedbacks.findAll();

    // Si aucun feedback n'est trouvé, on retourne une réponse avec un message
    if (feedbacks.length === 0) {
      return res.status(404).json({ message: "Aucun feedback trouvé." });
    }

    // Si des feedbacks sont trouvés, on les renvoie dans la réponse
    res.status(200).json(feedbacks);
  } catch (error) {
    // Gestion des erreurs en cas d'échec de la requête
    res.status(500).json({ message: "Erreur interne du serveur.", error: error.message });
  }
};

// 3. Créer un feedback
export const createFeedback = async (req, res) => {
  try {
    const { utilisateur_id, evenement_id, note, commentaire } = req.body;

    // Vérifier si les champs nécessaires sont fournis dans la requête
    if (!utilisateur_id || !evenement_id || !note) {
      return res.status(400).json({ message: "Utilisateur, événement et note sont requis." });
    }

    // Créer un nouveau feedback dans la base de données
    const feedback = await Feedbacks.create({
      utilisateur_id,
      evenement_id,
      note,
      commentaire,
    });

    // Retourner la réponse avec un message de succès et le feedback créé
    res.status(201).json({
      message: "Feedback soumis avec succès.",
      feedback,
    });
  } catch (error) {
    // Gestion des erreurs en cas de problème
    res.status(500).json({ message: "Erreur interne du serveur.", error: error.message });
  }
};
// Récupérer un feedback par son ID
export const getFeedbackById = async (req, res) => {
    try {
      const feedback = await Feedbacks.findByPk(req.params.id);
      if (!feedback) {
        return res.status(404).json({ message: "Feedback non trouvé." });
      }
      res.status(200).json(feedback);
    } catch (error) {
      res.status(500).json({ message: "Erreur interne du serveur.", error: error.message });
    }
  };