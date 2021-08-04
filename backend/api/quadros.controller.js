import QuadrosDAO from "../dao/quadrosDAO.js";

export default class QuadrosController {
    static async apiGetAvisos(req, res, next) {
        const avisosPerPage = req.query.avisosPerPage ? parseInt(req.query.avisosPerPage, 10) : 4
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.quadro) {
            filters.quadro = req.query.quadro
        } else if (req.query.previsao) {
            filters.previsao = req.query.previsao
        } else if (req.query.estado) {
            filters.estado = req.query.estado
        } else if (req.query.aviso) {
            filters.aviso = req.query.aviso
        }

        const { avisosList, totalNumAvisos } = await QuadrosDAO.getAvisos({
            filters,
            page,
            avisosPerPage,
        })

        let response = {
            avisos: avisosList,
            filters: filters,
            total_results: totalNumAvisos,
        }
        res.json(response)
    }
}