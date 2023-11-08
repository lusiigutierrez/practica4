import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from "./cliente.ts";
import CocheModel from "./coches.ts";

const TraspasarCoche = async (req: Request, res: Response) => {
  try {
    const { dni1, id, dni2 } = req.body;

    if (!dni1 || !id || !dni2) {
      res.status(400).json({
        code: 'missing_data',
        message: 'No has introducido todos los datos necesarios',
      });
      return;
    }

     // Validar los datos 
     if (typeof dni1 !== "string" && typeof id !== "string" && typeof dni2 !== "string"){
      res.status(400).json({
        code: 'invalid_data_format',
        message: 'Hay algun dato sin el formato que debe',
      });
      return;
     }

    const cliente1 = await ClienteModel.findOne({ dni: dni1 }).exec();

    if (!cliente1) {
      res.status(400).json({
        code: 'client1_not_found',
        message: 'No se encuentra al cliente.',
      });
      return;
    }

    // Busco el coche que se va a traspasar por id
    const coche = await CocheModel.findById(id).exec();

    if (!coche) {
      res.status(400).json({
        code: 'car_not_found',
        message: 'No se encuentra el coche 1.',
      });
      return;
    }

    const cliente2 = await ClienteModel.findOne({ dni: dni2 }).exec();

    if (!cliente2) {
      res.status(400).json({
        code: 'client2_not_found',
        message: 'No se encuentra al cliente 2.',
      });
      return;
    }

    // al cliente 2 si no tiene el array creado se lo creo

    if (!Array.isArray(cliente2.coches)) {
      cliente2.coches = [];
    }

    if (!cliente1.coches.includes(id)) { // compruebo que en el array esta el coche que va a traspasar al cliente2
      res.status(400).json({
        code: 'client_not_have_car',
        message: 'El cliente 1 no tiene el coche que se quiere traspasar.',
      });
      return;
    }
    //añado el coche al cliente 2
    cliente2.coches.push(id);

    // elimino el coche al cliente 1
    await ClienteModel.findOneAndUpdate(
        { dni: dni1 },
        { $pull: { coches: id } }
      ).exec();


    // meto el coche al cliente2
    await ClienteModel.updateOne(
      { dni: dni2 },
      {
        $set: {
          coches: cliente2.coches,
        },
      }
    );

  
    await coche.save();

    res.status(200).send({
      message: 'Se ha traspasado con éxito el coche!',
    });
  } catch (error) {
    res.status(500).json({
      code: 'internal_server_error',
      message: error.message,
    });
    return;
  }
};

export default TraspasarCoche;
