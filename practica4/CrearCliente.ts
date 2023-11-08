import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from "./cliente.ts";


const CrearCliente = async (req: Request, res: Response) => {
    try {
    
        const {dni, nombre, cartera} = req.body;

        if (!dni || !nombre || !cartera ) { // no puede faltar ningun dato al crear un cliente
          res.status(400).json({
            code: 'missing_data',
            message: 'No has introducido todos los datos necesarios',
          });
          return;
        }
         // Validar los datos 
         if (typeof dni !== "string" && typeof nombre !== "string" && typeof cartera !== "number"){
          res.status(400).json({
            code: 'invalid_data_format',
            message: 'Hay algun dato sin el formato que debe',
          });
          return;
         }

         const comprobarCliente= await ClienteModel.findOne({ dni:dni }).exec(); // busco si existe un cliente con ese dni

         if (comprobarCliente) { 
          res.status(400).json({
            code: 'duplicate_dni',
            message: 'Ya existe un cliente con este dni, el dni debe ser único.',
          });
          return;
        }

        const newCliente = new ClienteModel({ dni, nombre, cartera }); // se crea un nuevo cliente
        await newCliente.save(); // se guarda el cliente
    
        res.status(200).send({ 
            dni: newCliente.dni,
            nombre: newCliente.nombre,
            cartera: newCliente.cartera
        });
      } catch (error) {
        res.status(500).json({
          code: 'internal_server_error',
          message: error.message,
        });
        return;
      }
    };
    
    export default CrearCliente;