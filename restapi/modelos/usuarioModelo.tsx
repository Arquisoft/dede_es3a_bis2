import mongoose, { ObjectId } from 'mongoose';

export interface IUsuario {
    nombreUsuario: String;
    contraseña: String;
}

interface UsuarioDoc extends mongoose.Document {
    _id: ObjectId;
    nombreUsuario: string;
    contraseña: string;
}

interface UsuarioModelInterface extends mongoose.Model<UsuarioDoc> {
    build(attr: IUsuario): UsuarioDoc
}

const usuarioSchema = new mongoose.Schema({
    nombreUsuario: {
        type: String,
        required: true,
        trim: true
    },
    contraseña: {
        type: String,
        required: true,
        trim: true
    }
});

usuarioSchema.statics.build = (attr: IUsuario) => {
    return new Usuario(attr);
}

const Usuario: UsuarioModelInterface = mongoose.model<UsuarioDoc, UsuarioModelInterface>('Usuario', usuarioSchema, 'Usuario');

export { Usuario, UsuarioDoc }