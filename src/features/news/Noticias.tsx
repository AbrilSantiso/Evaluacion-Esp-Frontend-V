import { useEffect, useState } from "react";
import { obtenerInformacion } from "./utils";
import { INoticiasNormalizadas } from "./types";
import {
  ContenedorNoticias,
  ListaNoticias,
  TituloNoticias,
} from "./styled";
import Noticia from "./Noticia";
import Modal from "./Modal";


const Noticias = () => {

  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);

  useEffect(() => {
    async function obtenerNoticias(){
      const noticiasNormalizadas = await obtenerInformacion();
      setNoticias(noticiasNormalizadas)
    }
   obtenerNoticias()
  }, []);

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
        {noticias.map((n) => (
          <Noticia noticia={n} setModal={setModal}/>
        ))}
        {modal ? (
          <Modal modal={modal} setModal={setModal}/>
        ) : null}
      </ListaNoticias>
    </ContenedorNoticias>
  );
};

export default Noticias;
