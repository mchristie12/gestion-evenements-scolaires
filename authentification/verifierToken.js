
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifierToken = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(403).json({ message: "Accès refusé. Aucun token fourni" });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        //ajouter
        //  Convertir le rôle en minuscules pour éviter les erreurs de casse
        if (decoded.role) {
            decoded.role = decoded.role.toLowerCase();
        }
        //fin
        req.utilisateur = decoded; // Ajouter l'utilisateur décodé à la requête
        next();
    } catch (error) {
        res.status(401).json({ message: "Token invalide ou expiré" });
    }
};
