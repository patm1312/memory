export default function start(){
    const container = document.getElementById("container");
    const reorderButton = document.getElementById("reorder");
    function showCompletionMessage() {
      const messageElement = document.getElementById('gameMessage');
      
      // Cambiar el mensaje según el contexto
      messageElement.textContent = "¡Felicidades, has completado el juego! 🎉";
  
      // O si quieres incluir iconos de Font Awesome:
      // messageElement.innerHTML = "¡Felicidades, has completado el juego! <i class='fas fa-trophy'></i>";
  
      // Mostrar el mensaje
      messageElement.classList.remove('hidden');
  }
  

  
    function playing(){
      function addRotationStyle(id) {
        const div = document.getElementById(id);
        if (div) {  // Verifica si el div existe
          setTimeout(() => {
            div.style.transform = 'rotateY(180deg)';
          }, 1000);  // 1000 ms = 1 segundo
        }
      }
        let tempResults = []; 
        let Results = []; 
        let ids = []; 
        container.addEventListener('click', (e)=>{
          console.log('-------------------------------')
            // Obtenemos el padre directo del elemento que se clickeó
        const parentDiv = e.target.closest('.target');

          // Verificamos si el clic fue en el padre o en un hijo, pero aseguramos que se trate como si fuera en el padre
            if (parentDiv) {
                let target = e.target.closest('.target');
                //console.log("¡Hiciste clic en un botón especial!");
                let value = parentDiv.getAttribute("data-value");
                //console.log('el valor es ' + value);
                if(Results.includes(value)){
                  console.log(Results)
                  //si ya esta ese value clicado en el array de target de exito,no  haga nada.
                }else{
                    target.style.transform = 'rotateY(0deg)';
                    //console.log('.............')
                    console.log(target)
                    //console.log('.............')
                    let elementId = parseInt(parentDiv.id);
                    console.log('ELEMENTO ID ' + elementId);
                    if (tempResults.length === 0) {
                        //console.log("El array está vacío.");
                        //console.log(e.target)
                      
                        // Agregamos el valor al array
                        tempResults.push(value);
                        ids.push(elementId);
                        console.log('ids son. ' + ids);
                
                        console.log(tempResults); // Para verificar en la consola
                    } else {
                        //console.log("El array tiene elementos.");
                        console.log("El array ids" + ids + 'comparar ' + elementId);
                        if(ids.includes(elementId)){
                            tempResults.length = 0;
                            ids.length = 0;
                        
                            target.style.transform = "rotateY(180deg)";
                            
                        }else{
                            
                            if (tempResults.includes(value)) {
                              ids.length = 0;
                                console.log(`El valor "${value}" ya está en el array.`);
                                //se debe eliminar con la funcion start o  vaciar
                                tempResults.push(value);
                                Results.push(...tempResults);
                                //console.log(tempResults);
                                // Selecciona todos los elementos con data-value="Elemento 3"
                                
                                if (Results.length === 16) {
                                    //console.log("El array tiene 16 elementos.");
                                      // Ejemplo de llamada a la función cuando el juego se complete
                                      // Puedes llamarla al final de tu lógica del juego
                                      setTimeout(showCompletionMessage, 2000); // Simulamos un retraso para mostrar el mensaje
                                  } else {
                                    //console.log("El array no tiene 16 elementos.");
                                  }
                              } else {
                                // Agregamos el valor al array si no está repetido
                                ids.push(elementId);
                                //console.log('perdio los ids son ' + ids)
                                ids.forEach(id => {
                                  //console.log(id);
                                  addRotationStyle(id);  // Aplica el estilo al div con el id correspondiente
                                });
                                ids.length = 0;
                              }
                        }
                          tempResults.length = 0;
                    }
                }
                 
                
              } else {
                //console.log(e.target)
                //console.log("Este botón no es especial.");
              }
        })
    }
    function rotate(container){
        // Obtener todos los hijos
        container.classList.add("flip-container");
        let hijos = container.children;
       // Convertir la colección a un array y añadir la clase a cada hijo
        Array.from(hijos).forEach(element => {
            element.classList.add("flip-card");
        });
    }
    reorderButton.addEventListener("click", () => {
      const items = Array.from(container.children); // Convierte los hijos en un array
      const initialOrder = items.map(item => item.textContent).join(", "); // Guarda el orden inicial
      
      // Baraja los elementos
      items.sort(() => Math.random() - 0.5);
    
      // Limpia el contenedor y vuelve a añadir los elementos en el nuevo orden
      container.innerHTML = "";
      items.forEach((item) => container.appendChild(item));
    
      // Verificar si el orden cambió
      const newOrder = items.map(item => item.textContent).join(", ");
      if (initialOrder !== newOrder) {
        // console.log("El orden de los elementos ha cambiado con éxito.");
       // Establecer el tiempo en segundos
    let timeLeft = 5;

    const countdownElement = document.getElementById("countdown");
const container = document.getElementById("container"); // Asume que existe un contenedor para el elemento que se va a girar

function updateCountdown() { 
    countdownElement.textContent = timeLeft;

    if (timeLeft > 0) {
        timeLeft--;  // Decrementar el tiempo
        setTimeout(updateCountdown, 1000);  // Llamar a la función nuevamente en 1 segundo
    } else {
        countdownElement.textContent = ''; // Limpiar el número
        countdownElement.classList.add("complete");
        countdownElement.innerHTML = 'Let\'s go! <i class="fa fa-check-circle"></i>'; // Mostrar el mensaje con icono

        // Espera para que se vea el mensaje
        setTimeout(() => {
            countdownElement.remove(); // Eliminar el div de la cuenta regresiva
            rotate(container); // Función para girar el contenedor (asegurate de definirla)
            playing(); // Función para iniciar la acción (asegurate de definirla)
        }, 2000); // Retardo antes de eliminar el div (2 segundos)
    }
}

    // Iniciar la cuenta regresiva
    updateCountdown();
      } else {
        //console.log("El orden de los elementos no cambió.");
      }
    });
    
}