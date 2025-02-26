
import Utilisateur from "./Utilisateur.js";
import Evenement from "./Evenement.js";
import Inscription from "./Inscription.js";
import Notification from "./Notification.js";
import Feedback from "./Feedback.js";
import HistoriqueRecherches from "./HistoriqueRecherches.js";

// Utilisateur et Inscription (1 utilisateur peut avoir plusieurs inscriptions)
Utilisateur.hasMany(Inscription, { foreignKey: "utilisateur_id", as: "inscriptions" });
Inscription.belongsTo(Utilisateur, { foreignKey: "utilisateur_id", as: "participant" });

//  Événement et Inscription (1 événement peut avoir plusieurs inscriptions)
Evenement.hasMany(Inscription, { foreignKey: "evenement_id", as: "inscriptions" });
Inscription.belongsTo(Evenement, { foreignKey: "evenement_id", as: "evenement" });

//  Utilisateur et Événement (1 organisateur peut créer plusieurs événements)
Utilisateur.hasMany(Evenement, { foreignKey: "organisateur_id", as: "evenements_crees" });
Evenement.belongsTo(Utilisateur, { foreignKey: "organisateur_id", as: "organisateur" });

//  Événement et Feedback (1 événement peut recevoir plusieurs avis)
Evenement.hasMany(Feedback, { foreignKey: "evenement_id", as: "feedbacks" });
Feedback.belongsTo(Evenement, { foreignKey: "evenement_id", as: "evenement" });

//  Utilisateur et Feedback (1 utilisateur peut donner plusieurs avis)
Utilisateur.hasMany(Feedback, { foreignKey: "utilisateur_id", as: "feedbacks" });
Feedback.belongsTo(Utilisateur, { foreignKey: "utilisateur_id", as: "participant" });

//  Utilisateur et Notifications (1 utilisateur peut recevoir plusieurs notifications)
Utilisateur.hasMany(Notification, { foreignKey: "utilisateur_id", as: "notifications" });
Notification.belongsTo(Utilisateur, { foreignKey: "utilisateur_id", as: "destinataire" });

//  Utilisateur et Historique des Recherches (1 utilisateur peut faire plusieurs recherches)
Utilisateur.hasMany(HistoriqueRecherches, { foreignKey: "utilisateur_id", as: "recherches" });
HistoriqueRecherches.belongsTo(Utilisateur, { foreignKey: "utilisateur_id", as: "utilisateur" });

//  Événement et Historique des Recherches (1 événement peut être recherché plusieurs fois)
Evenement.hasMany(HistoriqueRecherches, { foreignKey: "evenement_id", as: "recherches" });
HistoriqueRecherches.belongsTo(Evenement, { foreignKey: "evenement_id", as: "evenement" });

// Exportation des modèles pour utilisation ailleurs dans l’application
export { Utilisateur, Evenement, Inscription, Notification, Feedback, HistoriqueRecherches };
