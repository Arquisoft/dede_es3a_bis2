import express, { Request, Response } from "express"
import { ObjectId } from "mongoose"
import { Pedido } from "../modelos/pedidoModelo"

//Obtenemos la url de la apirest de Heroku o utilizamos localhost por defecto
let URL_BASE = `${process.env.API_REST_URL_BASE_LOCAL}`
if (process.env.PORT) {
    URL_BASE = `${process.env.API_REST_URL_BASE_HEROKU}`
}

const router = express.Router()

router.post('/pedidos/add', async (req: Request, res: Response) => {
    const { usuario, precio, contenido } = req.body;

    const pedido = Pedido.build({ usuario, precio, contenido })
    await pedido.save()
    return res.status(201).send(pedido)
});

router.get('/pedidos/list/:usuario', async (req: Request, res: Response) => {
    const pedidos = await Pedido
        .find({
            usuario: req.params.usuario
        });
    return res.status(200).send(pedidos);
});

export { router as pedidosRutas };