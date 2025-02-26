// importer sequelize
import { Sequelize } from "sequelize";


//lire les variable d'environnement qui son dans .env
import dotenv from "dotenv";

// Configuration des variables d'environnement
dotenv.config();

// on cree la variable de connection
const connection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
        logging: console.log, // Activez temporairement les logs
        pool: {
            max: 5, // Nombre maximum de connexions dans le pool
            min: 0, // Nombre minimum de connexions dans le pool
            acquire: 30000, // Temps maximum en ms pour obtenir une connexion
            idle: 10000 // Temps maximum en ms pendant lequel une connexion peut être inactive
        }
    }
);

// Fonction pour tester la connexion
export const testConnection = async () => {
    try {
        await connection.authenticate();
        console.log('═══════════════════════════════════════');
        console.log(' Connexion à la BDD établie avec succès!');
        console.log('═══════════════════════════════════════');
        return true;
    } catch (error) {
        console.log('═══════════════════════════════════════');
        console.error(' Erreur de connexion à la BDD:', error.message);
        console.log(' Vérifiez vos paramètres de connexion :');
        console.log(' - La base de données existe-t-elle ?');
        console.log(' - Le serveur MySQL est-il démarré ?');
        console.log(' - Les identifiants sont-ils corrects ?');
        console.log('═══════════════════════════════════════');
        return false;
    }
};

// Ajouter après la configuration de la connexion
export const syncDatabase = async () => {
    try {
        await connection.sync();
        console.log('Tables synchronisées avec succès');
    } catch (error) {
        console.error('Erreur lors de la synchronisation des tables:', error);
    }
};

export default connection;
