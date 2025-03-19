/*export const autoriserRole = (roles) => {
    return (req, res, next) => {
        if (!req.utilisateur || !roles.includes(req.utilisateur.role)) {
            return res.status(403).json({ message: "Accès interdit" });
        }
        next();
    };
};

*/

//Importer le modele Etudiant
import { Utilisateur } from "../models/relations.js";

// Middleware pour verifier si un utilisateur a les bons roles
const autoriser = (roles) => async (req, res, next) => {
  // Recuperer l'ID de l'utilisateur depuis le token
  const id = req.utilisateurId;

  try {
    // Chercher l'utilisateur dans la base de donnees
    const utilisateur = await Utilisateur.findByPk(id);
    if (!utilisateur)
      return res
        .status(404)
        .json({ message: "Cet utilisateur n'est pas enregistre!" });

    // Recuperer le role de l'utilisateur
    const utilisateurRole = utilisateur.role?.toLowerCase();

    // Si l'employé n'a aucun rôle, le refuser
    if (!utilisateurRole) {
      return res.status(403).json({
        message: "Vous n'êtes pas autorisé à accéder à cette route.",
      });
    }

    // Vérifier si l'employé a l'un des rôles permis
    const hasRole = roles?.some(
      (role) => utilisateurRole === role.toLowerCase()
    );

    // Si l'employé a le rôle nécessaire, passer au middleware suivant
    if (hasRole) {
      next();
    } else {
      // Si l'employé n'a pas le rôle, retourner une erreur 403
      return res.status(403).json({
        message: "Vous n'êtes pas autorisé à accéder à cette route.",
      });
    }
  } catch (error) {
    // En cas d'erreur dans la requête, retourner une erreur 403
    res.status(403).json({ message: error.message });
  }
};

export default autoriser;
