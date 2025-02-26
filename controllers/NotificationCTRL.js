// 1. On importe l'entité/model "Notification"
import Notification from "../models/Notification.js";
import { validationResult } from "express-validator";

// 2. Lister les Notifications
export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des notifications", error });
    }
};

// 3. Lister les notifications d'un utilisateur spécifique
export const getNotificationsByUser = async (req, res) => {
    try {
        const { utilisateur_id } = req.params;
        const notifications = await Notification.findAll({ where: { utilisateur_id } });

        if (!notifications.length) {
            return res.status(404).json({ message: "Aucune notification trouvée pour cet utilisateur" });
        }

        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des notifications", error });
    }
};

// 4. Créer une notification
export const createNotification = async (req, res) => {
    // Vérifier les erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { utilisateur_id, evenement_id, message, type_notification } = req.body;
        const notification = await Notification.create({
            utilisateur_id,
            evenement_id,
            message,
            type_notification,
            date_envoi: new Date(),
            statut: "non lu",
        });

        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de la notification", error });
    }
};

// 5. Marquer une notification comme lue
export const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByPk(id);

        if (!notification) {
            return res.status(404).json({ message: "Notification non trouvée" });
        }

        notification.statut = "lu";
        await notification.save();

        res.status(200).json({ message: "Notification marquée comme lue", notification });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de la notification", error });
    }
};

// 6. Supprimer une notification
export const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByPk(id);

        if (!notification) {
            return res.status(404).json({ message: "Notification non trouvée" });
        }

        await notification.destroy();
        res.status(200).json({ message: "Notification supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de la notification", error });
    }
};
