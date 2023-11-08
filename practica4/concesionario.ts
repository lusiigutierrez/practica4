import mongoose from "npm:mongoose@7.6.3"
import {CocheModel} from "./coches.ts";
import { Coche } from "./coches.ts";

export type Concesionario = {
    name: string,
    localizacion: string,
    bloqueado: boolean,
    coches: Coche []
    
}

const Schema = mongoose.Schema; 

const ConcesionarioSchema = new Schema ({
        nombre: { type: String, required: true},
        localizacion: { type: String, required: true},
        bloqueado: { type: Boolean, required: true},
        coches: [{ type: Schema.Types.ObjectId, ref: "Coche" }],
      },
      { timestamps: true }
    );


export type ConcesionarioModelType = mongoose.Document & Omit<Concesionario, "nombre">;  
export const ConcesionarioModel = mongoose.model<ConcesionarioModelType>("Concesionario", ConcesionarioSchema); 
export default ConcesionarioModel; 