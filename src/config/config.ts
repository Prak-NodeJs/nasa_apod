import { Sequelize } from "sequelize";

console.log(process.env.DB_URL)
const dbUrl = process.env.DB_URL!;

const sequelize = new Sequelize(dbUrl);

const dbConnection = async () => {
    try {
        // Authenticate the database connection
        await sequelize.authenticate();
        console.log('Connected to the database');

        // Synchronize the models with the database schema
        await sequelize.sync({ force: true });
        console.log('Models synchronized successfully');

    } catch (error) {
        console.error('Error while connecting to the database:', error);
    }
};

export { dbConnection, sequelize };