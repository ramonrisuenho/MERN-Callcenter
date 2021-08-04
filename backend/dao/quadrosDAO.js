import { ObjectId } from "mongodb";

let avisos;

export default class QuadrosDAO {
    //Inicializando a conexão com o banco de dados e as coleções corretas
    static async injectDB(conn) {
        if (avisos) {
            return
        }
        try {
            avisos = await conn.db(process.env.AVISOSCALLCENTER_NS).collection("avisos");
        } catch (err) {
            console.error(
                `Unable to establish collection handle int AvisosDAO: ${err}`,
            )
        }
    }

    static async getAvisos({
        filters = null,
        page = 0,
        avisosPerPage = 4,
    } = {}) {
        let query
        if (filters) {
            if ("aviso" in filters) {
                query = {
                    $text: {
                        $search: filters["aviso"]
                    }
                }
            } else if ("quadro" in filters){
                query = {
                    "quadro": {
                        $eq: filters["quadro"]
                    }
                }
            } else if ("previsao" in filters) {
                query = {
                    "previsao": {
                        $eq: filters["previsao"]
                    }
                }
            } else if ("estado" in filters) {
                query = {
                    "estado": {
                        $eq: filters["estado"]
                    }
                }
            }
        }

        let cursor
        try {
            cursor = await avisos
                .find(query)
        } catch (err) {
            console.error(`Unable to issue find command, ${err}`)
            return {
                avisosList: [],
                totalNumAvisos: 0
            }
        }

        const displayCursor = cursor.limit(avisosPerPage).skip(avisosPerPage * page)
        try {
            const avisosList = await displayCursor.toArray()
            const totalNumAvisos = await avisos.countDocuments(query)
            return {
                avisosList,
                totalNumAvisos
            }
        } catch (err) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${err}`
            )
            return {
                avisosList: [],
                totalNumAvisos: 0
            }
        }

    }

   
}