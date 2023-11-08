import { Request, Response } from "npm:express@4.18.2";
import ConcesionarioModel from "./concesionario.ts";


const VerCochesConcesionario = async (req: Request, res: Response) => {
  try {
    const {nombre} = req.params;

    if (!nombre) {
      res.status(400).json({
        code: 'missing_data',
        message: 'No has introducido el dato necesario',
      });
      return;
    }

     // Validar los datos 
     if (typeof nombre !== "string"){
      res.status(400).json({
        code: 'invalid_data_format',
        message: 'El dato no tiene el formato que debe',
      });
      return;
     }

    const concesionarioRec = await ConcesionarioModel.findOne({nombre: nombre }).exec();

    if (!concesionarioRec) {
      res.status(400).json({
        code: 'client_not_found',
        message: 'No se encuentra el concesionario.',
      });
      return;
    }

    const cochesDelConcesionario = concesionarioRec.coches;

    res.status(200).send({
      message: 'Los coches que se encuentran en este concesionario son: ',
      cochesDelConcesionario
    });
  } catch (error) {
    res.status(500).json({
      code: 'internal_server_error',
      message: error.message,
    });
    return;
  }
};

export default VerCochesConcesionario;
