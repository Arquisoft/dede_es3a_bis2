import { User, Product, TypeProduct, Foto, Talla } from '../shared/shareddtypes';


//Obtenemos la url de la apirest de Heroku o utilizamos localhost por defecto
let apiEndPoint = 'http://localhost:8080/'
if (process.env.PORT) {
  apiEndPoint = 'http://dede-es3a-restapi.herokuapp.com/'
}

export async function addUser(user: User): Promise<boolean> {
  //const apiEndPoint= 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint + 'users/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'name': user.name, 'email': user.email })
  });
  if (response.status === 200)
    return true;
  else
    return false;
}

export async function getUsers(): Promise<User[]> {
  //const apiEndPoint= 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint + 'users/list');
  //The objects returned by the api are directly convertible to User objects
  return response.json()
}

export async function getProducts(): Promise<TypeProduct[]> {
  const response = await fetch(apiEndPoint + 'products/list');
  return response.json();
}

export async function getFotos(productId: string): Promise<Foto[]> {
  const response = await fetch(apiEndPoint + 'fotos/' + productId);
  return response.json();
}

export async function getProduct(productId: string): Promise<TypeProduct> {
  const apiPetition = apiEndPoint + 'producto/detalles/' + productId;
  const response = await fetch(apiPetition);
  return response.json();
}

export async function getTallas(productId: string): Promise<Talla[]> {
  const apiPetition = apiEndPoint + 'tallas_disponibles/' + productId;
  const response = await fetch(apiPetition);
  return response.json();
}