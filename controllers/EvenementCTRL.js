// 1. On importe l'entite/model "Evenement"
//import Evenement from "../models/Evenement.js";
import {Evenement, Utilisateur} from "../models/Relation.js";


// 2. Ajouter un nouvel événement
/*export const addEvenement = async (req, res) => {
  try {
    const newEvenement = req.body;
    const result = await Evenement.create(newEvenement);
    res
      .status(201)
      .json({ message: "Événement ajouté avec succès", data: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
*/

// Ajouter un nouvel événement avec vérification

export const addEvenement = async (req, res) => {

  try {

    const { nom, description, date, heure_debut, heure_fin, lieu, max_participants, organisateur_id, statut, qr_code } = req.body;
 
    // 1️⃣ Vérifier si l'organisateur existe

    const organisateur = await Utilisateur.findByPk(organisateur_id);

    if (!organisateur) {

      return res.status(404).json({ message: "L'organisateur n'existe pas." });

    }
 
    // 2️⃣ Vérifier si l'utilisateur est bien un organisateur

    /*if (organisateur.role !== "organisateur") {

      return res.status(403).json({ message: "Seuls les organisateurs peuvent créer un événement." });

    }
    */
    if (organisateur.role.toLowerCase() !== "organisateur") {
    return res.status(403).json({ message: "Seuls les organisateurs peuvent créer un événement." });
    }

 
    // 3️⃣ Créer l'événement après les vérifications

    const newEvenement = await Evenement.create({

      nom,

      description,

      date,

      heure_debut,

      heure_fin,

      lieu,

      max_participants,

      organisateur_id,

      statut,

      qr_code,

    });
 
    res.status(201).json({ message: "Événement ajouté avec succès", data: newEvenement });

  } catch (error) {

    res.status(400).json({ message: error.message });

  }

};

 
// 3. Modifier un événement
export const updateEvenement = async (req, res) => {
  try {
    const { id_evenement } = req.params;
    const {
      nom,
      description,
      date,
      heure_debut,
      heure_fin,
      lieu,
      max_participants,
      organisateur_id,
      statut,
      qr_code,
    } = req.body;
    const result = await Evenement.update(
      {
        nom,
        description,
        date,
        heure_debut,
        heure_fin,
        lieu,
        max_participants,
        organisateur_id,
        statut,
        qr_code,
      },
      { where: { id_evenement } }
    );
    res
      .status(200)
      .json({ message: "Événement mis à jour avec succès", data: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 4. Supprimer un événement
export const deleteEvenement = async (req, res) => {
  const { id_evenement } = req.params;
  try {
    const result = await Evenement.destroy({ where: { id_evenement } });
    res
      .status(200)
      .json({ message: `Événement ${id_evenement} supprimé`, data: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 5. lister les evenements
export const getEvenements = async (req, res) => {
  try {
    const evenements = await Evenement.findAll();
    res.status(200).json({ data: evenements });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 6. Récupérer un événement par son ID
export const getEvenementById = async (req, res) => {
  const { id_evenement } = req.params;
  try {
    const evenement = await Evenement.findByPk(id_evenement);
    if (!evenement) {
      return res.status(404).json({ message: "Événement non trouvé" });
    }
    res.status(200).json({ data: evenement });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

