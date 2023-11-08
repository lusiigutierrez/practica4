import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from "./cliente.ts";


const VerCochesCliente = async (req: Request, res: Response) => {
  try {
    const {dni} = req.params;

    if (!dni) {
      res.status(400).json({
        code: 'missing_data',
        message: 'No has introducido el dato necesario',
      });
      return;
    }

     // Validar los datos 
     if (typeof dni !== "string" ){
      res.status(400).json({
        code: 'invalid_data_format',
        message: 'El dato no tiene el formato que debe',
      });
      return;
     }
    const clienteCoches = await ClienteModel.findOne({dni: dni}).exec();

    if (!clienteCoches) {
      res.status(400).json({
        code: 'client_not_found',
        message: 'No se encuentra al cliente.',
      });
      return;
    }

    const cochesDelCliente = clienteCoches.coches;

    res.status(200).send({
      message: 'Los coches que tiene este cliente son: ',
      cochesDelCliente
    });
  } catch (error) {
    res.status(500).json({
      code: 'internal_server_error',
      message: error.message,
    });
    return;
  }
};

export default VerCochesCliente;
