Queridas Sofi y Euge, 

Felicitaciones por tan hermoso trabajo. Se que este TP era dificil pero viendolo terminado, estoy muy orgullosa, y espero que ustedes lo esten tambien: esta para mostrar en toda ocasion en que quieran demostrar el inmenso aprendizaje que hicieron a lo largo de este camino y su capacidad de trabajar dividiendose responsabilidsades. 

A nivel visual, la web se ve impecable para desktop. El responsive no esta implementado en algunas secciones (detalles de comic se ve raro, detalles de personaje es ilegible), y les diria que, de querer continuar mejorando este proyecto, deberia ser lo primero que encaren - es absolutamente vital si van a publicar este trabajo en redes o agregarlo a un portfolio. Tambien preferiria -pero esto ya es gusto personal - algun transition en las tarjetas para que el hover se vea mas armonioso. 

A nivel funcionalidades, veo que se cumple todo lo que pedimos y todo funciona muy bien  Se que este no era un trabajo facil, asi que no es poco. Despues de pasar semanas jugando en todos los TPs a "busco personaje, hago click en comic, voy a la ulima pagina, busco comic, me fijo si todo esta bien", es un placer enorme ver un trabajo donde todo funciona, no hay efectos secundarios inesperados ni errores catastroficos de javascript. Eso habla de que estuvieron mucho tiempo probando las funcionalidades y mejorando lo que hicieron: bien por eso. 

Algunas cositas que les podria comentar es, primero algo que ya saben, apenas carga la pagina veo "Resultados 0" debajo de los comics. Supongo que es para los personajes, pero deberia estar oculto. Vi el codigo que me dejaron al respecto, lamentablemente no entendi el problema - me extiendo en el archivo de js. La fecha esta sin formato, y seria muy lindo poder corregirla, ya sea con algun metodo de string o con el metodo Date. 

Con el metodo date podemos hacer: `const fecha = new Date(comic.modified)` y luego en el html escribir `fecha.toLocaleString()` y listo, se ve hermosa. 

El tercer comentario es que en la seccion de detalles de un comic estan siempre asumiendo que vendrá la información que necesitan. Eso es un error, en las APIs en general, y en la de Marvel en particular. Noten que si falta la descripción terminamos viendo "descripción: null" en la web. Cuando trabajamos con APIs, o con información que haya escrito un usuario, *siempre* debemos programar a la defensiva: asumiendo que todo lo que puede salir mal, saldrá mal. Que no vendrá la información que esperamos, que vendrá vacía, o mal formateada.  En lugar de agregar simplemente `description` a la tarjeta, agregamos `description || "No hay descripcion disponible"`, asi nuestro usuario no ve un `null` o un campo vacio. 

A nivel codigo, 

El HTML esta muy bien. Usan a la perfecccion las etiquetas semanticas, la accesibilidad esta bien cuidada, muchisimo mas de lo que se espera de desarrolladores con años de experiencia, y aprecio mucho que hayan incluido un form. Usan correctamente SASS, hay buena aplicacion de las variables, mixins y anidados, y demuestran haber comprendido bien como usarlo. Lamento que no hayan aplicado algo mas de arquitectura: componentizar el SASS, hacer carpetas para las variables, componentes, etc, hace que el codigo sea mucho mas mantenible y escalable. El sass esta algo desprolijo: bajense un formateador para vscode, como prettier, y acostumbrense a pasarlo antes de una entrega, tanto en el sass como en js. 

El JS esta muy bien. Usan correctamente los conocimientos vistos a lo largo del modulo, el codigo en general es prolijo y bien funcionalizado. Noto cierta dependencia de algunas soluciones del TP de Ada, y muuuchos console.log que a esta altura, despues de 5 TPs donde lo menciono, no son disculpables. Un console log puede costarles una entrevista tecnica: es de vital importancia que se acostumbren a borrarlos en el codigo a entregar. El JS esta algo desprolijo, muchos saltos de linea, falta de espacio entre operadores, cositas que con un formatter deberian poder arreglar rapidamente para mejorar muchisimo la impresion que causa al verlo. Aclaro que estos son comentarios bastante detallistas: en general el nivel del codigo es excelente. 

Ahora ya que esto funciona, podemos pensar en mejorar el JS. Muchas funciones son muuuy similares, solo cambiando algunas cosas en caso de que sean comics o personajes. Las super animo a que prueben de abstraer un poco el codigo asi no queda tan repetitivo: dividir todo en funciones mas pequeñas, tratar de reuitlizar codigo, usar logica para distinguir entre distintos fetch 

Con respecto al github, me gusta mucho el README y fue una alegria ver los commits y branches y notar lo prolijas que fueron para trabajar en equipo. Quiza quieran mencionar en el readme que el usuario va a tener que tener LiveServer para ejecutarlo en local. 

Mas alla de estos puntos, insisto en que el codigo es fantastico: solo hago estas observaciones para que quede aun mejor. 

Felicitaciones nuevamente, y sigan asi! 

 
  ✅ Respeta la consigna
  ✅ Respeta el diseño dado
  ✅ Respeta el funcionamiento
  ✅  Responsive funciona correctamente // con excepciones

  ✅ HTML semántico
  ✅ Código bien indentado
  ✅ Buenos nombres de clases
  ✅ Buenos nombres de funciones y variables
  ✅ Uso de variables (SASS)

  ❌ Buena estructura y separación de archivos (SASS)
  ✅ Correcto uso de estilos anidados (SASS)
  ❌ Nombres de branchs adecuados

  ❌ Componentización de estilos (SASS)
  ✅ Funciones pequeñas // a veces
  ✅ Lógica clara y simple
  ✅ Separación clara de manejo de datos y visualización

  ✅ Reutilización de lógica / funciones  // a veces 
  ✅ Commits con mensajes adecuados

Nota final: **9**
