import { Distribuidor } from "../../shared/shareddtypes";

// Convierte grados (parámetro) a radianes
function convertirARadianes(grados: number): number {
    let radianes = grados * Math.PI / 180.0;
    return radianes;
}

// Calcula el precio total (precio del carrito + gastos de envio)
export async function calcularGastos(direccionUsuario: string, distribuidor: Distribuidor) {
    let precioCarrito = Number(sessionStorage.getItem('precioCarrito'));
    let distancia = await calcularDistancia(direccionUsuario, distribuidor);
    return Number((precioCarrito + distancia).toFixed(2));
}

export async function calcularDistancia(direccionUsuario: string, distribuidor: Distribuidor) {
    if (direccionUsuario != "") {
        const coordenadas = await mapaCoordenadas(direccionUsuario);
        let radioTierra: number = 6371; // en kilometros

        let latitudAlmacen = distribuidor.latitud;
        let longitudAlmacen = distribuidor.longitud;
        let latitud = coordenadas.features[0].geometry.coordinates[1];
        let longitud = coordenadas.features[0].geometry.coordinates[0];
        let gradosLatitud: number = convertirARadianes(latitud - latitudAlmacen);
        let gradosLongitud: number = convertirARadianes(longitud - longitudAlmacen);

        latitudAlmacen = convertirARadianes(latitudAlmacen);
        latitud = convertirARadianes(latitud);

        let x: number = Math.sin(gradosLatitud / 2) * Math.sin(gradosLatitud / 2) + Math.sin(gradosLongitud / 2) * Math.cos(gradosLongitud / 2) * Math.cos(latitud);
        let y: number = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
        return Math.round(radioTierra * y * 0.3 * 100) / 100;
    } else {
        return 0;
    }
}

// Calcular las coordenadas de la direccion pasada por parametro
export function mapaCoordenadas(direccion: string) {
    const axios = require('axios');
    return axios.get(
        // token de acceso mapbox
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" + direccion + ".json?access_token=" + "pk.eyJ1IjoidW8yNzAxNDkiLCJhIjoiY2wzbjNhMjNwMDlzbTNmczZ4OWhram5vNyJ9.fyje5-aW4xDAQycUq12Rjg"
    ).then((response: any) => {
        return response.data;
    }).catch((error: any) => {
        return error;
    })
}