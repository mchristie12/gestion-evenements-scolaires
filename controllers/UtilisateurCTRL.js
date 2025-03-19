import { Utilisateur } from "../models/Relation.js";
import bcrypt from "bcrypt";

// Créer un utilisateur
export const createUtilisateur = async (req, res) => {
  try {
    const { prenom, nom, email, telephone, mot_de_passe, role, methode_auth, derniere_connexion } = req.body;

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    const newUser = await Utilisateur.create({
      prenom,
      nom,
      email,
      telephone,
      mot_de_passe: hashedPassword, // Stocke le mot de passe hashé
      role,
      derniere_connexion,
      methode_auth
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur :', error);
    res.status(500).json({ error: error.message });
  }
};

// Lister les utilisateurs
export const getUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.findAll();
    res.status(200).json(utilisateurs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer un utilisateur par ID
export const getUtilisateurById = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByPk(req.params.id);
    if (!utilisateur) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.status(200).json(utilisateur);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un utilisateur
export const updateUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByPk(req.params.id);
    if (!utilisateur) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    
    await utilisateur.update(req.body);
    res.status(200).json(utilisateur);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un utilisateur
export const deleteUtilisateur = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Utilisateur.destroy({ where: { id} });
    res
      .status(200)
      .json({ message: `Utilisateur ${id} supprimé`, data: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

  
  /*
  try {
    const utilisateur = await Utilisateur.findByPk(req.params.id);
    if (!utilisateur) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    await utilisateur.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
    
};
*/
