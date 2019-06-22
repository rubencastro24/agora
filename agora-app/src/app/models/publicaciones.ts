export class Publicaciones {
    _id: string;
    usuario: string;
    descripción: string;
    imagen: File;
    fechaPublicacion: Date;
    comentarios: [
        {
            usuario: string,
            comentario: string,
            fechaComentario: Date
        }
    ];
    meGusta: [
        {
            usuario: string,
            fechaMeGusta: Date
        }
    ];
}