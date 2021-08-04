import AvisosDAO from "../dao/AvisosDAO.js"

export default class AvisosController {
  static async apiPostAvisos(req, res, next) {
    try {
      const avisoId = req.body.aviso_id
      const quadro = req.body.quadro
      const aviso = req.body.aviso
      const previsao = req.body.previsao
      const estado = req.body.estado
      const date = new Date()

      const AvisosResponse = await AvisosDAO.addAviso(
        avisoId,
        quadro,
        aviso,
        previsao,
        estado,
        date,
      )
      res.json({ status: "success" })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async apiUpdateAviso(req, res, next) {
    try {
      const avisoId = req.body.aviso_id
      const quadro = req.body.quadro
      const aviso = req.body.aviso
      const previsao = req.body.previsao
      const estado = req.body.estado
      const date = new Date()

      const avisoResponse = await AvisosDAO.updateAviso(
        avisoId,
        quadro,
        aviso,
        previsao,
        estado,
        date,
      )

      var { error } = avisoResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (avisoResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update aviso - user may not be original poster",
        )
      }
      res.json({ status: "success" })
      console.log("Success")
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async apiDeleteAviso(req, res, next) {
    try {
      const avisoId = req.query.id
      console.log(avisoId)
      const avisoResponse = await AvisosDAO.deleteAviso(
        avisoId,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

}