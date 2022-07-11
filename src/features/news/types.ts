export interface INoticiasNormalizadas {
    id: number;
    titulo: string;
    descripcion: string;
    fecha: number | string;
    esPremium: boolean;
    imagen: string;
    descripcionCorta?: string;
  }

  export interface INoticiaProps {
    noticia: INoticiasNormalizadas,
    setModal: (noticia: INoticiasNormalizadas)=>void
  }

  export interface IModalProps {
    modal: INoticiasNormalizadas,
    setModal: (noticia: INoticiasNormalizadas | null)=>void
  }