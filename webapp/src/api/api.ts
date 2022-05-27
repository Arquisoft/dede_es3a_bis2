import { User, Product, TypeProduct, Foto, Talla, Distribuidor, Pedido, TypePedido } from '../shared/shareddtypes';


//Obtenemos la url de la apirest de Heroku o utilizamos localhost por defecto
let apiEndPoint: string = 'http://localhost:8080/'
if (process.env.PORT) {
  apiEndPoint = 'http://dede-es3a-restapi.herokuapp.com/'
}

export async function addUser(user: User): Promise<boolean> {
  let response: Response = await fetch(apiEndPoint + 'users/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'nombreUsuario': user.nombreUsuario, 'contraseña': user.contraseña })
  });
  if (response.status === 201)
    return true;
  else
    return false;
}

export async function getUsers(): Promise<User[]> {
  const response: Response = await fetch(apiEndPoint + 'users/list');
  //The objects returned by the api are directly convertible to User objects
  return response.json()
}

export async function getProducts(): Promise<TypeProduct[]> {
  const response: Response = await fetch(apiEndPoint + 'products/list');
  return response.json();
}

export async function getFotos(productId: string): Promise<Foto[]> {
  const response: Response = await fetch(apiEndPoint + 'fotos/' + productId);
  return response.json();
}

export async function getProduct(productId: string): Promise<TypeProduct> {
  const apiPetition: string = apiEndPoint + 'producto/detalles/' + productId;
  const response: Response = await fetch(apiPetition);
  return response.json();
}

export async function getTallas(productId: string): Promise<Talla[]> {
  const apiPetition: string = apiEndPoint + 'tallas_disponibles/' + productId;
  const response: Response = await fetch(apiPetition);
  return response.json();
}

export async function getDistribuidores(): Promise<Distribuidor[]> {
  const apiPetition: string = apiEndPoint + 'distribuidores';
  const response: Response = await fetch(apiPetition);
  return response.json();
}

export async function añadirPedido(pedido: Pedido): Promise<Pedido> {
  const pedidoDatos = { usuario: pedido.usuario, precio: pedido.precio, contenido: pedido.contenido };
  let response: Response = await fetch(apiEndPoint + 'pedidos/add', {
    method: 'POST',
    body: JSON.stringify(pedidoDatos),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.json();
}

export async function getPedidos(usuario: string): Promise<TypePedido[]> {
  const apiPetition: string = apiEndPoint + 'pedidos/list/' + encodeURIComponent(usuario);
  const response: Response = await fetch(apiPetition);
  return response.json();
}
