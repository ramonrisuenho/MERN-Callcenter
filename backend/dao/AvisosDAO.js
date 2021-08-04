import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;
let avisos
export default class AvisosDAO{
    static async injectDB(conn){
        if (avisos){
            return
        }
        try {
            avisos = await conn.db(process.env.AVISOSCALLCENTER_NS).collection("avisos")
        } catch (err){
            console.error(`Unable to establish collection handles in AvisosDAO: ${err}`)
        }
    }

    static async addAviso( quadroId, quadro, aviso, previsao, estado, date) {
        try {
          const avisoDoc = {
              quadro: quadro,
              aviso: aviso,
              previsao: previsao,
              estado: estado,
              date: date,
              quadro_id: ObjectId(quadroId),}
    
          return await avisos.insertOne(avisoDoc)
        } catch (e) {
          console.error(`Unable to post review: ${e}`)
          return { error: e }
        }
      }
    
      static async updateAviso(avisoId, quadro, aviso, previsao, estado, date) {
        try {
          const updateResponse = await avisos.updateOne(
            { _id: ObjectId(avisoId)},
            { $set: { quadro: quadro, aviso: aviso, previsao: previsao, estado: estado, date: date  } },
          )
    
          return updateResponse
        } catch (e) {
          console.error(`Unable to update review: ${e}`)
          return { error: e }
        }
      }
    
      static async deleteAviso(avisoId) {
        try {
          const deleteResponse = await avisos.deleteOne({
            _id: ObjectId(avisoId),
          })
    
          return deleteResponse
        } catch (e) {
          console.error(`Unable to delete review: ${e}`)
          return { error: e }
        }
      }
}