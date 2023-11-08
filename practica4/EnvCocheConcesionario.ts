import { Request, Response } from "npm:express@4.18.2";
import ConcesionarioModel from "./concesionario.ts";
import CocheModel from "./coches.ts";

const EnvCocheConcesionario = async (req: Request, res: Response) => {
  try {
    const { matricula, nombre } = req.body;

    if (!matricula || !nombre) {
      res.status(400).json({
        code: 'missing_data',
        message: 'No has introducido todos los datos necesarios',
      });
      return;
    }

     // Validar los datos 
     if (typeof matricula !== "string" && typeof nombre !== "string"){
      res.status(400).json({
        code: 'invalid_data_format',
        message: 'Hay algun dato sin el formato que debe',
      });
      return;
     }

    const cocheMandar = await CocheModel.findOne({ matricula: matricula }).exec(); // busco el coche por su matricula

    if (!cocheMandar) {
      res.status(400).json({
        code: 'car_not_found',
        message: 'No se encuentra el coche.',
      });
      return;
    }

    const concesionarioRec = await ConcesionarioModel.findOne({nombre:  nombre }).exec(); // busco el concesionario


    if (!concesionarioRec) {
      res.status(400).json({
        code: 'concesionario_not_found',
        message: 'No se encuentra el concesionario.',
      });
      return;
    }

    // Compruebo si el apartado de coches del concesionario es un array y sino lo creo. 
    if (!Array.isArray(concesionarioRec.coches)) {
      concesionarioRec.coches = []; 
    }

    // compruebo si esta lleno el array de coches del concesionario
    if (concesionarioRec.coches.length >= 10) {
      res.status(400).json({
        code: 'concesionario_full',
        message: 'El concesionario esta lleno.',
      });
      return;
    }

   
    const cocheExistente = concesionarioRec.coches.find((coche) => coche.matricula === matricula);

    // compruebo si ya esta ese coche en el concesionario el coche que quiero enviar
    if (cocheExistente) {
      res.status(400).json({
        code: 'car_already_in_concesionario',
        message: 'El coche ya se encuentra en el concesionario.',
      });
      return;
    }

    
    concesionarioRec.coches.push(cocheMandar); // meto el coche que quiero mandar en le array 

    // añado el coche al concesionario
     await ConcesionarioModel.updateOne(
      { nombre: nombre }, // nombre del concesionario en el cual quiero meter el coche 
      {
        $set: {
          coches: concesionarioRec.coches, // la modificacion 
        },
      }
    );

    res.status(200).send({
      message: 'Coche enviado al concesionario',
    });
  } catch (error) {
    res.status(500).json({
      code: 'internal_server_error',
      message: error.message,
    });
    return;
  }
};

export default EnvCocheConcesionario;



    


    
    