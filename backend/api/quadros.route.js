import express from "express";
import QuadrosController from "./quadros.controller.js"
import AvisosController from "./avisos.controller.js"
//definindo as rotas da aplicação
const router = express.Router();
router.route("/").get(QuadrosController.apiGetAvisos);
router
    .route("/avisos")
    .post(AvisosController.apiPostAvisos)
    .put(AvisosController.apiUpdateAviso)
    .delete(AvisosController.apiDeleteAviso)
export default router;