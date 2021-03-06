import request, { Response } from 'supertest';
import { Application } from 'express';

let app: Application;
//let server: http.Server;
const servidor = require('./servidor.tests');

beforeAll(async () => {
    // Iniciar la base de datos
    await servidor.startBD();
    // Iniciar el servidor
    app = await servidor.startServidor();
});

afterAll(async () => {
    // Cerrar el servidor
    await servidor.closeServidor();
    // Cerrar la base de datos
    await servidor.closeBD();
});

describe('user ', () => {
    /**
     * Probar que podemos listar usuarios sin errores
     */
    it('can be listed', async () => {
        const response: Response = await request(app).get("/api/users/list");
        expect(response.statusCode).toBe(200);
    });

    /**
     * Probar que un usuario puede ser creado a través de productService sin lanzar errores
     */
    it('can be created correctly', async () => {
        let username: string = 'UO270149';
        let email: string = 'UO270149@uniovi.es';
        const response: Response = await request(app).post('/api/users/add').send({ name: username, email: email }).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
    })
});

describe('producto', () => {
    /**
     * Probar que podemos listar productos sin errores
     */
    it('can be listed', async () => {
        const response: Response = await request(app).get("/api/products/list");
        const productos: [] = response.body;

        // todo en orden
        expect(response.statusCode).toBe(200);
        // la longitud de las listas es la esperada
        expect(productos.length).toBe(6);
    });

    /**
     * Probar que podemos obtener un producto por su referencia
     */
    it('can be found by reference', async () => {
        let referencia = '1';
        let response: Response = await request(app).get('/api/products/detalles/' + referencia);
        let producto: [] = response.body;

        // todo en orden
        expect(response.statusCode).toBe(200);
        // encuentra 1 producto con esa referencia
        expect(producto.length).toEqual(1);
    });

    /**
     * Probar que no obtenemos nada al buscar un producto que no existe
     */
    it('product that does not exist', async () => {
        // Referencia de un producto inexistente
        let referencia: string = "asdfghjklñ";
        // Buscamos un producto con esa referencia (inexistente)
        const response: Response = await request(app).get('/api/products/detalles/' + referencia);
        // El código de respuesta debería ser 404 (no encontrado)
        expect(response.statusCode).toBe(404);
    });
});

describe('pedidos', () => {
    it('can be listed', async () => {
        let usuario: string = 'https://uo270149.inrupt.net/profile/card#me';
        let usuarioEncoded: string = encodeURIComponent(usuario);
        let response: Response = await request(app).get('/api/pedidos/list/' + usuarioEncoded);
        let pedidos: [] = response.body;

        // todo en orden
        expect(response.statusCode).toBe(200);
        // el usuario tiene 1 pedido
        expect(pedidos.length).toEqual(1);
    })
})