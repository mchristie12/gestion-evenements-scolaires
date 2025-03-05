
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
        req.utilisateur = decoded; // Ajouter l'utilisateur décodé à la requête
        next();
    } catch (error) {
        res.status(401).json({ message: "Token invalide ou expiré" });
    }
};
