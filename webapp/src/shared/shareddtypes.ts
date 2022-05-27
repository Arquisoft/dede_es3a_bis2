import { ObjectId } from 'mongoose';

export type User = {
  nombreUsuario: string;
  contraseña: string;
}

export type Product = {
  nombre: string;
  precio: number;
}

export type Foto = {
  ruta: string;
  descripcion: string;
  producto: string;
}

export type TypeProduct = {
  _objectId: ObjectId;
  id: string;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
  color: string;
}

export type Address = {
  calle: String;
  localidad: string;
  codigoPostal: string;
  region: string;
  pais: string;
}

export type Talla = {
  numero: string;
  cantidad: number;
  producto: string;
}

export type Distribuidor = {
  nombre: string;
  latitud: number;
  longitud: number;
}

export type Pedido = {
  usuario: string;
  precio: number;
  contenido: Array<string>;
}

export type TypePedido = {
  _objectId: ObjectId;
  usuario: string;
  precio: number;
  contenido: Array<string>;
}