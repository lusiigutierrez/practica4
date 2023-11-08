import mongoose from "npm:mongoose@7.6.3"

export type Coche = {
    id: mongoose.type.ObjectId,  // voy a usar el id para eliminar y modificar los coches
    matricula: string,
    modelo: string,
    precio: number
}


const Schema = mongoose.Schema; 

const CocheSchema = new Schema ({
        id: {type: Schema.ObjectId}, 
        matricula: { type: String, required: true },
        modelo: { type: String, required: true},
        precio: { type: Number, required: true },
      },
      { timestamps: true }
    );


export type CocheModelType = mongoose.Document & Omit<Coche, "matricula">;  
export const CocheModel = mongoose.model<CocheModelType>("Coche", CocheSchema); 
export default CocheModel; 