import express, { Request, Response } from 'express';
import { Usuario } from '../modelos/usuarioModelo';
import "dotenv/config";

type User = {
    nombreUsuario: string;
    contraseña: string;
}

//Obtenemos la url de la apirest de Heroku o utilizamos localhost por defecto
let apiEndPoint: string = 'http://localhost:8080/'
if (process.env.PORT) {
    apiEndPoint = 'http://dede-es3a-restapi.herokuapp.com/'
}

const router = express.Router();

router.get('users/login/:nombreUsuario/:contraseña', async (req: Request, res: Response) => {
    let usuario: User[] = new Array<User>();
    const nombreUsuario: string = req.params.nombreUsuario;
    const contraseña: string = req.params.contraseña;

    // crear modelo Usuario
    const busqueda = await Usuario.findOne({ nombreUsuario: nombreUsuario, contraseña: contraseña });

    if (busqueda) {
        // encontrado
        let entrada = busqueda;
        let salida: User = ({ nombreUsuario: "", contraseña: "" });
        salida.nombreUsuario = entrada.nombreUsuario.toString();
        salida.contraseña = entrada.contraseña.toString();
        usuario.push(salida);
        return res.status(200).send(usuario);
    } else {
        // no encontrado
        return res.status(500).json();
    }
})

export { router as usuarioRouter };