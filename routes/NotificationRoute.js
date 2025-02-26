import { Router } from "express";
import { 
    getNotifications, 
    getNotificationsByUser, 
    createNotification, 
    markAsRead, 
    deleteNotification 
} from "../controllers/NotificationCTRL.js";
import NotificationValidation from "../validations/NotificationValidation.js";

// 1. On crée le router "NotificationRoute"
const NotificationRoute = Router();

// 2. Récupérer toutes les notifications
NotificationRoute.get("/", getNotifications);

// 3. Récupérer les notifications d'un utilisateur
NotificationRoute.get("/user/:utilisateur_id", getNotificationsByUser);

// 4. Créer une notification avec validation
NotificationRoute.post("/", NotificationValidation, createNotification);

// 5. Marquer une notification comme lue
NotificationRoute.put("/:id/read", markAsRead);

// 6. Supprimer une notification
NotificationRoute.delete("/:id", deleteNotification);

// 7. On exporte la route "NotificationRoute"
export default NotificationRoute;
