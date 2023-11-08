import { Request, Response } from "npm:express@4.18.2";
import CocheModel from "./coches.ts";


const CrearCoche = async (req: Request, res: Response) => {
    try {
        const { matricula, modelo, precio } = req.body;

        if (!matricula || !modelo || !precio) { // no puede faltar ningun dato al crear un coche
          res.status(400).json({
            code: 'missing_data',
            message: 'No has introducido todos los datos necesarios',
          });
          return;
        }

         // Validar los datos 
         if (typeof matricula !== "string" && typeof modelo !== "string"  && typeof precio !== "number"){
          res.status(400).json({
            code: 'invalid_data_format',
            message: 'Hay algun dato sin el formato que debe',
          });
          return;
         }
  
      const comprobarCoche= await CocheModel.findOne({ matricula:matricula }).exec(); // busco si hay algun coche con esa matricula

      if (comprobarCoche) { 
        res.status(400).json({
          code: 'duplicate_matricula',
          message: 'Ya existe un coche con esta matricula, la matricula debe ser única.',
        });
        return;
      }
    
        const newCoche = new CocheModel({ matricula, modelo, precio }); // se crea un nuevo coche
        await newCoche.save(); // se guarda el nuevo coche
    
        res.status(200).send({
          matricula: newCoche.matricula,
          modelo: newCoche.modelo,
          precio:newCoche.precio,
          
        });
      } catch (error) {
        res.status(500).json({
          code: 'internal_server_error',
          message: error.message,
        });
        return;
      }
    };
    
    export default CrearCoche;