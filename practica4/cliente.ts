import mongoose from "npm:mongoose@7.6.3"
import {CocheModel} from "./coches.ts";
import { Coche } from "./coches.ts";

export type Cliente = {
    dni: string, 
    nombre: string,
    cartera: number,
    coches: Coche []
}


const Schema = mongoose.Schema; 

const ClienteSchema = new Schema ({
        dni: { type: String, required: true },
        nombre: { type: String, required: true},
        cartera: { type: Number, required: true },
        coches: [{ type: Schema.Types.ObjectId, ref: "Coche" }],

      },
      { timestamps: true }
    );


export type ClienteModelType = mongoose.Document & Omit<Cliente, "dni">;  
export const ClienteModel = mongoose.model<ClienteModelType>("Cliente", ClienteSchema); 
export default ClienteModel; 