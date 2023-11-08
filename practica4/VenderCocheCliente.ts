import { Request, Response } from "npm:express@4.18.2";
import {CocheModel} from "./coches.ts";
import { ClienteModel } from "./cliente.ts";
import ConcesionarioModel from "./concesionario.ts";

const venderCocheCliente = async (req: Request, res: Response) => {
  try {
    const { id, dni, nombre } = req.body;

    if (!id || !dni || !nombre) {
      res.status(400).json({
        code: 'missing_data',
        message: 'No has introducido todos los datos necesarios',
      });
      return;
    }

    if (typeof id !== "string" && typeof dni !== "string" && typeof nombre !== "string") {
      res.status(400).json({
        code: 'invalid_data_format',
        message: 'Hay algun dato sin el formato que debe',
      });
      return;
     }

    const concesionario = await ConcesionarioModel.findOne({nombre: nombre }).exec();

    if (concesionario?.bloqueado === true) { // compruebo si el concesionario esta bloqueado
      res.status(400).json({
        code: 'concesionario_lock',
        message: 'El concesionario esta bloqueado, no puede vender ningun coche.',
      });
      return;
    }

    const cliente = await ClienteModel.findOne({ dni: dni }).exec();

    if (!cliente) {
      res.status(400).json({
        code: 'client_not_found',
        message: 'No se encuentra al cliente.',
      });
      return;
    }

    if (cliente.cartera <= 0) {
      res.status(400).json({
        code: 'client_not_have_money',
        message: 'El cliente no tiene dinero.',
      });
      return;
    }

    const cocheVendido = await CocheModel.findById(id).exec();

    if (!cocheVendido) {
      res.status(400).json({
        code: 'car_not_found',
        message: 'No se encuentra el coche.',
      });
      return;
    }

    const precioDelCoche = cocheVendido.precio;
    const dineroCliente = cliente.cartera;

    if (precioDelCoche > dineroCliente) {
      res.status(400).json({
        code: 'not_enough_money',
        message: 'El cliente no tiene dinero suficiente para comprar el coche.',
      });
      return;
    }

    if (!Array.isArray(cliente.coches)) {
      cliente.coches = [];
    }

     cliente.coches.push(cocheVendido);

    const dineroActualCliente = dineroCliente - precioDelCoche;

    await ClienteModel.updateOne(
      { dni: dni },
      {
        $set: {
          cartera: dineroActualCliente,
          coches: cliente.coches,
        },
      }
    );
    await ConcesionarioModel.updateOne(
      { nombre: nombre },
      {
        $pull: {
          coches: id,
        },
      }
    );

    await cliente.save();
    await cocheVendido.save();

    res.status(200).json({
      message: 'Venta realizada con éxito, disfruta de su coche !!',
    });
  } catch (error) {
    res.status(500).json({
      code: 'internal_server_error',
      message: error.message,
    });
    return;
  }
};

export default venderCocheCliente;
