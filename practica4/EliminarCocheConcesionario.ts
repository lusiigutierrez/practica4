import { Request, Response } from "npm:express@4.18.2";
import ConcesionarioModel from "./concesionario.ts";
import CocheModel from "./coches.ts";



const eliminarCocheConcesionario = async (req: Request, res: Response) => {
  try {
    const {id, nombre} = req.body;

    if (!id || !nombre ) {  
      res.status(400).json({
        code: 'missing_data',
        message: 'No has introducido todos los datos necesarios',
      });
      return;
    }

     // Validar los datos 
     if (typeof id !== "string" && typeof nombre !== "string"){
      res.status(400).json({
        code: 'invalid_data_format',
        message: 'Hay algun dato sin el formato que debe',
      });
      return;
     }

    const cocheEliminar = await CocheModel.findById(id).exec();

    if (!cocheEliminar) {
      res.status(400).json({
        code: 'car_not_found',
        message: 'No se encuentra el coche.',
      });
      return;
    }

    const concesionarioEliminar = await ConcesionarioModel.findOne({ nombre: nombre }).exec();

    if (!concesionarioEliminar) {
      res.status(400).json({
        code: 'concesionario_not_found',
        message: 'No se encuentra el concesionario.',
      });
      return;
    }

    // uso el pull para eliminar elementos del array. 
    await ConcesionarioModel.findOneAndUpdate(
      { nombre: nombre },
      { $pull: { coches: id } }
    ).exec();
    
    res.status(200).send("Coche eliminado");
  } catch (error) {
    res.status(500).json({
      code: 'internal_server_error',
      message: error.message,
    });
    return;
  }
};
  
  export default eliminarCocheConcesionario;