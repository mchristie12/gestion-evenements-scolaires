import Utilisateur from "../models/Utilisateur.js";
import bcrypt from "bcrypt";

// Liste des utilisateurs
export const getAllUtilisateurs = async (req, res) => {
    try {
        const utilisateurs = await Utilisateur.findAll();
        if (utilisateurs.length === 0) {
            return res.status(404).json({ message: "Aucun utilisateur trouvé." });
        }
        res.status(200).json(utilisateurs);
    } catch (error) {
        res.status(500).json({ message: "Erreur interne du serveur.", error: error.message });
    }
};

// Création d'un utilisateur
export const createUtilisateur = async (req, res) => {
    try {
        const { nom, email, mot_de_passe } = req.body;

        if (!nom || !email || !mot_de_passe) {
            return res.status(400).json({ message: "Tous les champs sont requis." });
        }

        const hashedPassword = await bcrypt.hash(mot_de_passe, 10); // Hash du mot de passe
        const utilisateur = await Utilisateur.create({
            nom,
            email,
            mot_de_passe: hashedPassword,
        });

        res.status(201).json(utilisateur);
    } catch (error) {
        res.status(500).json({ message: "Erreur interne du serveur.", error: error.message });
    }
};

// Récupération d'un utilisateur par ID
export const getUtilisateurById = async (req, res) => {
    try {
        const { id } = req.params;
        const utilisateur = await Utilisateur.findByPk(id);

        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        res.status(200).json(utilisateur);
    } catch (error) {
        res.status(500).json({ message: "Erreur interne du serveur.", error: error.message });
    }
};
