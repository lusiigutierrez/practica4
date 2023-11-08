import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from "./cliente.ts";


const AñadirDineroCliente = async (req: Request, res: Response) => {
    try {
    
        const {dni, dinero} = req.body;
       

        if (!dni || !dinero) { 
          res.status(400).json({
            code: 'missing_data',
            message: 'No has introducido todos los datos necesarios',
          });
          return;
        }
        
         // Validar los datos 
         if (typeof dni !== "string" && typeof dinero !== "number"){
          res.status(400).json({
            code: 'invalid_data_format',
            message: 'El dato no tiene el formato que debe',
          });
          return;
         }
      
        const clienteDinero = await ClienteModel.findOne({dni: dni}).exec();  // se busca al cliente por su dni
        if (!clienteDinero){
          res.status(400).json({
            code: 'client_not_found',
            message: 'No se encuentra al cliente, no se puede añadir dinero.',
          });
          return;
        }

        if (dinero < 0){
          res.status(400).json({
            code: 'negative_amount',
            message: 'No se puede introducir una cantidad negativa de dinero.',
          });
          return;
        }

        const carteraActual = clienteDinero.cartera;
        const suma: number = carteraActual + dinero; 

        await ClienteModel.updateOne( // lo modifico
        { dni:dni},
        {
          $set: {
          cartera:suma,
        },
        }
      );
  
        res.status(200).send({
          dni: clienteDinero.dni, 
          nombre: clienteDinero.nombre,
          cartera: suma
        });
        console.log("se ha modificado correctamente la cartera")
      } catch (error) {
        res.status(500).json({
          code: 'internal_server_error',
          message: error.message,
        });
        return;
      }
    };
    
    export default AñadirDineroCliente;