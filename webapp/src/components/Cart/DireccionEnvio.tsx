import { Distribuidor } from "../../shared/shareddtypes";

// Convierte grados (parámetro) a radianes
function ConvertirARadianes(grados: number): number {
    let radianes = grados * Math.PI / 180.0;
    return radianes;
}

// Calcula el precio total (precio del carrito + gastos de envio)
export async function CalcularGastos(direccionUsuario: string, distribuidor: Distribuidor) {
    let precioCarrito = Number(sessionStorage.getItem('precioFinal'));
    let distancia = await CalcularDistancia(direccionUsuario, distribuidor);
    return Number((precioCarrito + distancia).toFixed(2));
}

export async function CalcularDistancia(direccionUsuario: string, distribuidor: Distribuidor): Promise<number> {
    if (direccionUsuario != "") {
        const coordenadas = await MapaCoordenadas(direccionUsuario);
        let radioTierra: number = 6371; // en kilometros

        // obtener coordenadas del distribuidor
        let latitudDistribuidor = distribuidor.latitud;
        let longitudDistribuidor = distribuidor.longitud;

        // obtener coordenadas del usuario
        let latitudUsuario = coordenadas.features[0].geometry.coordinates[1];
        let longitudUsuario = coordenadas.features[0].geometry.coordinates[0];

        let dLat = ConvertirARadianes(latitudDistribuidor - latitudUsuario);
        let dLong = ConvertirARadianes(longitudDistribuidor - longitudUsuario);

        let a: number = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(ConvertirARadianes(latitudUsuario)) * Math.cos(ConvertirARadianes(latitudDistribuidor)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
        let c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        let result = Math.round(radioTierra * c * 0.3 * 100) / 100;
        return result;
    } else {
        return 0;
    }
}

// Calcular las coordenadas de la direccion pasada por parametro
export function MapaCoordenadas(direccion: string) {
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