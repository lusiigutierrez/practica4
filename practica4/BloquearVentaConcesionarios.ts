import { Request, Response } from "npm:express@4.18.2";
import ConcesionarioModel from "./concesionario.ts";

const BloquearVentaConcesionario = async (req: Request, res: Response) => {
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

    const concesionario = await ConcesionarioModel.findOne({ nombre: nombre}).exec(); // busco al concesionario

    if (!concesionario) {
      res.status(400).json({
        code: 'concesionario_not_found',
        message: 'No se encuentra el concesionario.',
      });
      return;
    }
    concesionario.bloqueado = true; // bloqueo el concesionario para que no pueda vender coches

    await ConcesionarioModel.updateOne( // lo modifico
      { nombre:nombre},
      {
        $set: {
          bloqueado:true,
        },
      }
    );

    res.status(200).send({
      message: 'Se ha bloqueado el concesionario con exito!!',
    });
  } catch (error) {
    res.status(500).json({
      code: 'internal_server_error',
      message: error.message,
    });
    return;
  }
};

export default BloquearVentaConcesionario;
