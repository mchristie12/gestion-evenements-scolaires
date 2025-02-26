// 1. On importe l'entite/model "Inscription"
import Inscription from "../models/Inscription.js";
import Utilisateur from "../models/Utilisateur.js";
import Evenement from "../models/Evenement.js";

//  Créer une nouvelle inscription
export const creerInscription = async (req, res) => {
    try {
        const { utilisateur_id, evenement_id } = req.body;

        // Vérifier si l'événement existe
        const evenement = await Evenement.findByPk(evenement_id);
        if (!evenement) {
            return res.status(404).json({ message: "Événement non trouvé." });
        }

        // Vérifier si l'utilisateur est déjà inscrit à cet événement
        const dejaInscrit = await Inscription.findOne({
            where: { utilisateur_id, evenement_id }
        });

        if (dejaInscrit) {
            return res.status(400).json({ message: "Utilisateur déjà inscrit à cet événement." });
        }

        // Création de l'inscription
        const inscription = await Inscription.create({
            utilisateur_id,
            evenement_id
        });

        res.status(201).json(inscription);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'inscription", error: error.message });
    }
};

//  Récupérer toutes les inscriptions
export const obtenirToutesInscriptions = async (req, res) => {
    try {
        const inscriptions = await Inscription.findAll({
            include: [
                { model: Utilisateur, as: "participant", attributes: ["id", "prenom", "nom", "email"] },
                { model: Evenement, as: "evenement", attributes: ["id_evenement", "nom", "date", "lieu"] }
            ]
        });

        res.status(200).json(inscriptions);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des inscriptions", error: error.message });
    }
};

//  Récupérer une inscription spécifique
export const obtenirInscription = async (req, res) => {
    try {
        const { id } = req.params;

        const inscription = await Inscription.findByPk(id, {
            include: [
                { model: Utilisateur, as: "participant", attributes: ["id", "prenom", "nom", "email"] },
                { model: Evenement, as: "evenement", attributes: ["id_evenement", "nom", "date", "lieu"] }
            ]
        });

        if (!inscription) {
            return res.status(404).json({ message: "Inscription non trouvée." });
        }

        res.status(200).json(inscription);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'inscription", error: error.message });
    }
};

//  Annuler une inscription
export const annulerInscription = async (req, res) => {
    try {
        const { id } = req.params;

        const inscription = await Inscription.findByPk(id);
        if (!inscription) {
            return res.status(404).json({ message: "Inscription non trouvée." });
        }

        await inscription.destroy();
        res.status(200).json({ message: "Inscription annulée avec succès." });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'annulation de l'inscription", error: error.message });
    }
};

//  Mettre à jour le statut de présence
export const mettreAJourPresence = async (req, res) => {
    try {
        const { id } = req.params;
        const { presence } = req.body;

        const inscription = await Inscription.findByPk(id);
        if (!inscription) {
            return res.status(404).json({ message: "Inscription non trouvée." });
        }

        inscription.presence = presence;
        await inscription.save();

        res.status(200).json({ message: "Statut de présence mis à jour avec succès.", inscription });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de la présence", error: error.message });
    }
};

//  Récupérer l'historique des inscriptions d'un utilisateur
export const obtenirHistoriqueInscriptions = async (req, res) => {
    try {
        const { utilisateur_id } = req.params;

        const historique = await Inscription.findAll({
            where: { utilisateur_id },
            include: [
                { model: Evenement, as: "evenement", attributes: ["id_evenement", "nom", "date", "lieu", "statut"] }
            ],
            order: [["date_inscription", "DESC"]]
        });

        res.status(200).json(historique);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'historique", error: error.message });
    }
};
