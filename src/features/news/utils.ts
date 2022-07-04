import { obtenerNoticias } from "./fakeRest";
import { INoticiasNormalizadas } from "./types";

export const initialsToUppercase:(title: string) => string = title =>{
   const parsedTitle =  title
    .split(" ")
    .map((str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    })
    .join(" ");
    return parsedTitle;
}

export const calculatePassedMinutes:(fecha: Date) => number = fecha =>{
    const ahora = new Date();
    const minutosTranscurridos = Math.floor((ahora.getTime() - fecha.getTime()) / 60000 );
     return minutosTranscurridos;
 }

 export const obtenerInformacion: () => Promise<INoticiasNormalizadas[]> = async () => {
    const respuesta = await obtenerNoticias();
    const data = respuesta.map((n) => {
      const titulo = initialsToUppercase(n.titulo);
      const minutosTranscurridos = calculatePassedMinutes(n.fecha);
      return {
        id: n.id,
        titulo,
        descripcion: n.descripcion,
        fecha: `Hace ${minutosTranscurridos} minutos`,
        esPremium: n.esPremium,
        imagen: n.imagen,
        descripcionCorta: n.descripcion.substring(0, 100),
      };
    });
    return data;
  }; 