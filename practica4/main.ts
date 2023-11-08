import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import CrearCoche from "./CrearCoche.ts";
import CrearConcesionario from "./CrearConcesionario.ts";
import CrearCliente from "./CrearCliente.ts";
import AñadirDineroCliente from "./Dinero.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import EnvCocheConcesionario from "./EnvCocheConcesionario.ts";
import VerCochesConcesionario from "./VerCochesConcesionario.ts";
import venderCocheCliente from "./VenderCocheCliente.ts";
import eliminarCocheCliente from "./EliminarCocheCliente.ts";
import VerCochesCliente from "./VerCochesCliente.ts";
import BloquearVentaConcesionario from "./BloquearVentaConcesionarios.ts";
import eliminarCocheConcesionario from "./EliminarCocheConcesionario.ts";
import TraspasarCoche from "./TraspasarCocheClienteCliente.ts";

const env = await load();

const URL_MONGO = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!URL_MONGO) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

try{
    await mongoose.connect(URL_MONGO); 
    console.log ("Te has conectado correctamente")
    const app = express();
    app.use(express.json());

    app
  .post("/crearCoche", CrearCoche)
  .post ("/crearConcesionario", CrearConcesionario)
  .post ("/crearCliente", CrearCliente)
  .put("/dinero", AñadirDineroCliente)
  .post("/enviarCoche", EnvCocheConcesionario)
  .get("/verCocheConcesionario/:nombre", VerCochesConcesionario)
  .get("/verCocheCliente/:dni", VerCochesCliente)
  .post("/venderCoche", venderCocheCliente)
  .delete("/eliminarCocheCliente", eliminarCocheCliente)
  .delete("/eliminarCocheConcesionario", eliminarCocheConcesionario)
  .post("/bloquearConcesionario/:nombre", BloquearVentaConcesionario)
  .put ("/traspasoDeCoche", TraspasarCoche)


  app.listen(3000, () => console.info("Server listening on port 3000"));


}catch (e){
    console.log(e)
}

//await mongoose.connect(URL_MONGO);
