'use strict';
/*

Diagrama de flujo:

Flujo 1: empieza al arrancar la página
Flujo 1. Pido los datos al servidor
Flujo 1.1: Pinto los datos con un value diferente para identificar cada checkbox de manera única
Flujo 1.2: Escucho evento change sobre cada checkbox
---
Flujo 2: empieza cuando la usuaria hace click en el checkbox y el navegador lanza el evento change
Flujo 2.1: Reacciono al evento change
Flujo 2.2: Obtengo la info que necesito
Flujo 2.3: Modifico mis datos
Flujo 2.4: Pinto los datos
Flujo 2.5: Escucho evento change sobre cada checkbox
---
Los flujos 2.4 y 2.5 son iguales que los 1.1 y 1.2. Por ello vamos a reutilizar el código

*/
const countElement = document.querySelector('.js-count');
const listElement = document.querySelector('.js-list');

let tasks = [];

//feth: obtener las tareas
function getData() {
  fetch('http://api.igarrido.es/tasks.json')
    .then((response) => response.json())
    .then((taskData) => {
      console.log(taskData);
      tasks = taskData;
      // Paso 1 Mostrar una frase que indique cuántas tareas hay.
      countElement.innerHTML = `Tenemos ${tasks.length} tareas`;
      renderList();
    });
}
getData();

// Paso 4. Marcar tareas como completas o incompletas
/**
 * Con renderList, se recorren las tareas del array tasks y se escriben dentro de
 * <li> en la página (en el ul.js-list).
 * Al escribir todas, se llama a listenInputs().
 */

const renderList = () => {
  console.log('Escribo las tareas en el HTML');
  let html = '';
  let checked;
  for (let index = 0; index < tasks.length; index++) {
    const oneTask = tasks[index];
    if (oneTask.completed) {
      html += `<li class="crossout">`;
    } else {
      html += `<li>`;
    }
    checked = oneTask.completed ? 'checked' : '';
    html += `<input class="js-complete" value="${index}" type="checkbox" ${checked}/>`;
    html += oneTask.name;
    html += `</li >`;
  }
  listElement.innerHTML = html;
  // Asignar eventos
  listenInputs();
};

/**
 * Es una función que se ejecuta cuando la usuaria haga click en algún input.js-complete
 * Cada input tiene el índice del elemento que le corresponde en su atributo value.
 * Tomaremos el valor de value y lo usaremos para acceder al elemento del array con los datos.
 * En ese elemento, se cambiará el valor de completed por su contrario.
 *
 * Como se modifica el array de datos, se vuelve a llamar a renderList()
 *   para que se vuelva a pintar la lista de tareas acutalizada
 */

const handleClick = (event) => {
  console.log('Atiendo un click en un checkbox');
  const indexList = parseInt(event.currentTarget.value);
  console.log(
    `Has hecho click sobre el input asociado al dato de la posición ${indexList}`
  );
  // Establezco la tarea como no-completada (si completed === true)
  // o la marco como completada (si completed === false --> el else)
  /*   
  if (tasks[indexList].completed) {
    tasks[indexList].completed = false;
  }
  else {
    tasks[indexList].completed = true;
  }
  */
  tasks[indexList].completed = !tasks[indexList].completed;

  // Ahora que he actualizado la lista de datos, vuelvo a escribirlos en el HTML:
  renderList();
};
/**
 * listenInputs busca todos los input con la clase .js-complete y les asocia
 * al evento click la función handleClick().
 * Cuando se haga click sobre un input.js-complete, el navegador llamará a handleClick()
 */

const listenInputs = () => {
  console.log('Asigno eventos a cada input-checkbox');
  const inputCheckList = document.querySelectorAll('.js-complete');
  for (const oneInput of inputCheckList) {
    oneInput.addEventListener('click', handleClick);
  }
};
// Cuando cargue la página, escribo los datos en el HTML:
renderList();
