import express, { Request, Response, Router } from 'express';
import { check } from 'express-validator';
import { isValidObjectId, ObjectId } from 'mongoose';
import { Pedido, PedidoDoc } from './modelos/pedidoModelo';
//import mongoose from 'mongoose';
import { IProducto, Producto, ProductoDoc } from './modelos/productoModelo';

const Productos = require('./modelos/productoModelo');
const mongoose = require('mongoose');
const api: Router = express.Router();

interface User {
    name: string;
    email: string;
}

//This is not a restapi as it mantains state but it is here for
//simplicity. A database should be used instead.
let users: Array<User> = [];

api.get(
    "/users/list",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send(users);
    }
);

api.post(
    "/users/add", [
    check('name').isLength({ min: 1 }).trim().escape(),
    check('email').isEmail().normalizeEmail()
],
    async (req: Request, res: Response): Promise<Response> => {
        let name = req.body.name;
        let email = req.body.email;
        let user: User = { name: name, email: email };
        users.push(user);
        return res.sendStatus(200);
    }
);

api.get(
    "/products/list",
    async (req: Request, res: Response): Promise<Response> => {
        const productos: IProducto[] = await Productos.find({});
        return res.status(200).send(productos); // obtener productos de la bd
    }
);

api.get(
    "/products/:id",
    async (req: Request, res: Response): Promise<Response> => {
        var id = req.params.id;
        var objID = mongoose.Types.ObjectId(id);
        console.log(objID);
        const productos: IProducto = await Productos.findOne({ _id: objID });
        if (productos) {
            return res.status(200).send(productos);
        } else {
            return res.status(404).json({ message: 'El producto con nombre "${objID}" no se ha encontrado.' });
        }

    }
)

api.get('products/detalles/:referencia', async (req: Request, res: Response) => {
    type TypeProduct = {
        _objectId: ObjectId;
        id: String;
        nombre: String;
        precio: Number;
        descripcion: String;

    }
    let result: TypeProduct[] = new Array<TypeProduct>();
    let ref: string = req.params.referencia;
    let producto = await Producto.findOne({ referencia: ref });
    if (producto) {
        let entrada: ProductoDoc = producto;
        let salida: TypeProduct = ({ _objectId: entrada._id, id: '', nombre: '', precio: 0, descripcion: '' });
        salida.id = entrada.referencia;
        salida.nombre = entrada.marca + ' ' + entrada.modelo;
        salida.descripcion = entrada.descripcion;
        salida.precio = entrada.precio;
        result.push(salida);
        return res.status(200).send(result);
    } else {
        return res.status(500).json();
    }
})

api.get('/pedidos/list/:usuario', async (req: Request, res: Response) => {
    type TypePedido = {
        _objectId: ObjectId;
        usuario: String;
        precio: Number;
        contenido: Array<String>;
    }

    let result: TypePedido[] = new Array<TypePedido>();
    let usuario: string = req.params.usuario;
    let pedidosUsuario: PedidoDoc[] = await Pedido.find({ usuario: usuario });

    for (let i = 0; i < pedidosUsuario.length; i++) {
        let entrada: PedidoDoc = pedidosUsuario[i];
        let salida: TypePedido = ({ _objectId: entrada._id, usuario: '', precio: 0, contenido: [] });
        salida.usuario = entrada.usuario;
        salida.precio = entrada.precio;
        salida.contenido = entrada.contenido;

        result.push(salida);
    }
    return res.status(200).send(result);
})
module.exports = api;
export default api;