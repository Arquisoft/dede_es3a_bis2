import mongoose from 'mongoose'

interface IDistribuidor {
    nombre: String;
    latitud: Number;
    longitud: Number;
  }
    
  interface DistribuidorDoc extends mongoose.Document {
    nombre: String;
    latitud: Number;
    longitud: Number;
  }

  interface DistribuidorModelInterface extends mongoose.Model<DistribuidorDoc> {
    build(attr: IDistribuidor): DistribuidorDoc
  }

const distribuidorSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    latitud: {
        type: Number,
        required: true
    },
    longitud: {
      type: Number,
      required: true
  },
})

distribuidorSchema.statics.build = (attr: IDistribuidor) => {
    return new Distribuidor(attr)
}

const Distribuidor = mongoose.model<DistribuidorDoc, DistribuidorModelInterface>('Distribuidor', distribuidorSchema, 'Distribuidor')

export { Distribuidor, DistribuidorDoc}
