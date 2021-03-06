const elementos = document.getElementsByTagName("td"); // -> Devuelve lista de todos los <td></td>
const tabla = document.getElementById("tablero"); // -> Devuelve el elemento cuyo id es tablero


// Itera las filas
for (let i = 0; i < tabla.rows.length; i++) {
  const fila = tabla.rows[i]; // i (num fila) -> fila (elemento en si)

  for (let j = 0; j < fila.cells.length; j++) {
    const casilla = fila.cells[j];

    // i -> (num fila)
    // j -> (num columna)
    // casilla -> (td)
    
    // asignamos onclick a la casilla
    casilla.onclick = () => {
      casilla.classList.toggle("iluminado") // Interruptor de clases

      // Iluminar las de alrededor

      // arriba
      if(i > 0) { 
        tabla.rows[i-1] // seleccionamos fila (una menos)
          .cells[j] // seleccionamos columna
          .classList.toggle("iluminado") // ilumninamos
      }
      
      // abajo
      if(i < tabla.rows.length - 1) {
        tabla.rows[i+1] // seleccionamos fila (una menos)
          .cells[j] // seleccionamos columna
          .classList.toggle("iluminado") // ilumninamos
      }
      
      // izquierda
      if(j > 0) {
        tabla.rows[i] // seleccionamos fila (una menos)
          .cells[j-1] // seleccionamos columna
          .classList.toggle("iluminado") // ilumninamos
      }

      // derecha
      if(j < tabla.rows[0].cells.length - 1) {
        tabla.rows[i] // seleccionamos fila (una menos)
        .cells[j+1] // seleccionamos columna
        .classList.toggle("iluminado") // ilumninamos
      }
      comprobarGanador();
    }

  }

  // const array = [ 10, 40, 30 ];

  // array[0] -> 10
  // array[1] -> 40
  // array[2] -> 30

  // array.length -> 3


  
}

let generados = 0;

while(generados < 6) {
  const fila = getRandomArbitrary(0, tabla.rows.length);
  const columna = getRandomArbitrary(0, tabla.rows[0].cells.length);

  if(!tabla.rows[fila].cells[columna].classList.contains("iluminado")) { // Si la lista de clases no contiene iluminado 
    tabla.rows[fila].cells[columna].classList.toggle("iluminado");
    generados++;
  }
}


/*
  Pendientes:
    1. Cada jugada, comprobar si ha ganado
    2. Tablero de dimensiones modificables
    3. Crono + contador de jugadas
*/

// Retorna un n??mero aleatorio entre min (incluido) y max (incluido)
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * max) - min;
}

// Comprueba si hay ganador
function comprobarGanador() {

  // For of -> Para cada "casilla" del array de elementos
  for (const casilla of elementos) {
    const iluminado = casilla.classList.contains("iluminado"); // Contiene la class=iluminado? -> True / False

    if(iluminado == false) {
      return; // Paramos la ejecuci??n de la funci??n
    }
  }

  // Solo llega si no ha saltado el return -> Todas est??n iluminadas
  alert("has ganado");
  ganador = true;
}

niveles.onsubmit = (event) => {
  event.preventDefault(); // No recarga la p??gina
  const nivel = document.querySelector('input[name="nivel"]:checked').value; // Nos devuelve el valor del nivel seleccionado (F M S)

  if(nivel == "F") {
    window.location = "facil.html";
  } else if(nivel == "M") {
    window.location = "medio.html";
  } else if(nivel == "D") {
    window.location = "dificil.html";
  } else if(nivel == "P") {
    // Tener en cuenta lo que ha puesto el usuario (filas, columnas, luces)
    
    const data = new FormData(event.target); // Habilita getters y setters para el formulario
    
    const filas = data.get("filas");
    const columnas = data.get("columnas");
    const luces = data.get("luces");

    const url = new URL("/personalizado.html", window.location.origin); // personalizado.html

    url.searchParams.append("filas", filas); // personalizado.html?filas=3
    url.searchParams.append("columnas", columnas);
    url.searchParams.append("luces", luces);

    window.location = url.toString();
    
  }
}