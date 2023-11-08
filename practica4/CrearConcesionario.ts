import { Request, Response } from "npm:express@4.18.2";
import ConcesionarioModel from "./concesionario.ts";


const CrearConcesionario = async (req: Request, res: Response) => {
    try {
        const {nombre, localizacion} = req.body;

        if (!nombre || !localizacion ) { /// no puede faltar ningun dato al crear un concesionario
          res.status(400).json({
            code: 'missing_data',
            message: 'No has introducido todos los datos necesarios',
          });
          return;
        }

         // Validar los datos 
         if (typeof nombre !== "string" && typeof localizacion !== "string"){
          res.status(400).json({
            code: 'invalid_data_format',
            message: 'Hay algun dato sin el formato que debe',
          });
          return;
         }

      const comprobarConcesionario = await ConcesionarioModel.findOne({ nombre: nombre }).exec(); // busco si hay algun concesionario con ese nombre

      if (comprobarConcesionario) { 
        res.status(400).json({
          code: 'duplicate_dni',
          message: 'Ya existe un concesionario con este nombre, el nombre debe ser único.',
        });
        return;
      }
      
        const newConcesionario = new ConcesionarioModel({ nombre: nombre, localizacion: localizacion, bloqueado: false }); // se crea el nuevo concesionario
        await newConcesionario.save(); // se guarda
    
        res.status(200).send({
          nombre: newConcesionario.nombre,
          localizacion: newConcesionario.localizacion
         
          
        });
      } catch (error) {
        res.status(500).json({
          code: 'internal_server_error',
          message: error.message,
        });
        return;
      }
    };
    
    export default CrearConcesionario;