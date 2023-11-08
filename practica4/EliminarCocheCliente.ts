import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from "./cliente.ts";
import CocheModel from "./coches.ts";



const eliminarCocheCliente = async (req: Request, res: Response) => {
    try {
      const {id, dni} = req.body;

      if (!id || !dni ) {  
        res.status(400).json({
          code: 'missing_data',
          message: 'No has introducido todos los datos necesarios',
        });
        return;
      }

       // Validar los datos 
       if (typeof id !== "string" && typeof dni !== "string"){
        res.status(400).json({
          code: 'invalid_data_format',
          message: 'Hay algun dato sin el formato que debe',
        });
        return;
       }

      const cocheEliminar = await CocheModel.findById(id).exec(); // busco el coche por su id para que sea mas facil eliminar el coche

      if (!cocheEliminar) {
        res.status(400).json({
          code: 'car_not_found',
          message: 'No se encuentra el coche.',
        });
        return;
      }

      const clienteEliminar = await ClienteModel.findOne({ dni: dni }).exec(); // busco el cliente

      if (!clienteEliminar) {
        res.status(400).json({
          code: 'client_not_found',
          message: 'No se encuentra al cliente.',
        });
        return;
      }

      // para eliminar un elemento del array he usado el pull
      await ClienteModel.findOneAndUpdate(
        { dni: dni },
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
  
  export default eliminarCocheCliente;