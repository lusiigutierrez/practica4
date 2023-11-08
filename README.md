# practica4
El Cliente tiene los siguientes parámetros: 
Dni 
Nombre
Cartera
Un array de coches en el cual se meten coches de la clase coche

El Coche tiene los siguientes parámetros: 
Id con el que voy a hacer las búsquedas de coches y modificaciones 
Matricula
Modelo
Bloqueado, para así poder bloquear las ventas del concesionario
Precio

El Concesionario tiene los siguientes parámetros: 
Nombre
Localización 
Un array de coches en el cual se meten coches de la clase coche


En todas las funciones tendrán una comprobación inicial para saber si se han introducido los parámetros necesarios para hacer esa función y también se comprobaran si se han introducido con el formato adecuado. 

Como voy a crear un coche es necesario hacerlo con .post en el cual se deberán introducir los parámetros que he mencionado anteriormente, sino dará un error entre otros.
Cada coche tiene que tener una matrícula única por lo que se hace una comprobación de que no se crea un coche con la misma matrícula. 
  .post("/crearCoche", CrearCoche)

Como voy a crear un concesionario es necesario hacerlo con .post en el cual se deberán introducir los parámetros que he mencionado anteriormente, sino dará un error entre otros.
Cada concesionario tiene que tener un nombre único por lo que se hace una comprobación de que no se crea un concesionario con el mismo nombre. 
  .post ("/crearConcesionario", CrearConcesionario)

Como voy a crear un cliente es necesario hacerlo con .post en el cual se deberán introducir los parámetros que he mencionado anteriormente, sino dará un error entre otros.
Cada cliente tiene que tener un dni único por lo que se hace una comprobación de que no se crea un cliente con el mismo dni. 
  .post ("/crearCliente", CrearCliente)

Para añadir dinero al cliente se hace una modificación, es decir, con put. Es necesario en el body introducir el dni del cliente y el dinero que se quiere añadir (dni, dinero). Se hacen diversas comprobaciones para que el dinero que se está introduciendo no sea ni 0 ni números menores a él y que el dni exista en la base de datos. 
  .put("/dinero", AñadirDineroCliente)


Para enviar un coche se crea un coche nuevo en el concesionario, es decir, se añade un coche al array de coches del concesionario, es necesario la matrícula del coche que se quiere enviar y el nombre del concesionario (matricula, nombre), es necesario hacer diversas comprobaciones para comprobar de que existe el coche y el concesionario. 
  .post("/enviarCoche", EnvCocheConcesionario)

Para ver los coches que tiene un concesionario se pasa el nombre del concesionario y se hace con un get porque muestra los datos de la base de datos.
  .get("/verCocheConcesionario/:nombre", VerCochesConcesionario)

Para ver los coches que tiene un cliente se pasa el dni del cliente y se hace con un get porque muestra los datos de la base de datos.
  .get("/verCocheCliente/:dni", VerCochesCliente)


Para vender un coche es necesario la matrícula del coche que se va a vender, el dni del cliente al que se le va a vender el coche y el concesionario que será quien venda el coche al cliente. 
Se hacen varias comprobaciones, ver si tiene suficiente dinero,si el concesionario no está bloqueado, se crea el array de coches si aún no ha tenido ningún coche previamente el cliente y se añade el coche. Se hace una modificación con el set para modificar la cartera del cliente y el array de coches. 
  .post("/venderCoche", venderCocheCliente)

Para eliminar un coche es necesario el pull porque se elimina un elemento del array. Es necesario el id del coche y el dni del cliente.
  .delete("/eliminarCocheCliente", eliminarCocheCliente)

Para eliminar un coche es necesario el pull porque se elimina un elemento del array. Es necesario el id del coche y el nombre del concesionario.
  .delete("/eliminarCocheConcesionario", eliminarCocheConcesionario)

Para bloquear un concesionario solo hace falta el nombre de este y se bloquean las ventas. 
  .post("/bloquearConcesionario/:nombre", BloquearVentaConcesionario)

Para hacer un traspaso se hace con put ya que estamos modificando y eliminando. Necesito el dni del cliente 1, el id del coche que se va a traspasar y el dni del cliente 2. 
Se harán varias comprobaciones para ver si los dos clientes existen y que el coche que se va a pasar al segundo cliente lo tiene el cliente 1 previamente, con el fin de hacer un pull en el cliente 1 para quitarle el coche y se hace un set en el cliente 2 para añadirle el coche traspasado.
  .put ("/traspasoDeCoche", TraspasarCoche)

