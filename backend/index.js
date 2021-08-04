import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import QuadrosDAO from "./dao/quadrosDAO.js"
import AvisosDAO from "./dao/AvisosDAO.js";
//configurações de ambiente
dotenv.config();
const port = process.env.PORT || 8000;
//conctando o banco de dados
const MongoClient = mongodb.MongoClient;
MongoClient.connect(
        process.env.AVISOSCALLCENTER_DB_URI
    )
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await QuadrosDAO.injectDB(client);
        await AvisosDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`\n*****************************************\n*\t\t\t\t\t*\n*   Servidor rodando na porta ${port}\t*\n*\t\t\t\t\t*\n*****************************************`)
        })
    })