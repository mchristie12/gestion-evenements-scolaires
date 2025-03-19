
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Utilisateur from "../models/Utilisateur.js"; // Import du modèle utilisateur
import { validationResult } from "express-validator";
dotenv.config(); // Charger les variables d'environnement

console.log("JWT_SECRET:", process.env.JWT_SECRET);

export const login = async (req, res) => {
  // Validation des entrées
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, mot_de_passe } = req.body;

    // Vérifier si l'utilisateur existe
    const utilisateur = await Utilisateur.findOne({ where: { email } });
    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Vérifier si le mot de passe est correct
    const passwordValid = await bcrypt.compare(
      mot_de_passe,
      utilisateur.mot_de_passe
    );
    if (!passwordValid) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: utilisateur.id, role: utilisateur.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Expiration du token
    );

    //res.status(200).json({ message: "Connexion réussie", token });
    res.status(200).json({
      message: "Connexion réussie",
      token,
      user: {
        id: utilisateur.id,
        email: utilisateur.email,
        role: utilisateur.role, // 🔥 Ajoute le rôle ici !
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
