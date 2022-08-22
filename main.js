//VARIABLES

const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#mistweets");
const textoTweets = document.querySelector(".mistweets-container")
let tweets = [];


//EVENT LISTENERS
enventListeners();
function enventListeners() {
    formulario.addEventListener("submit", agregarTweet);
    //cuando el documento este listo
    document.addEventListener("DOMContentLoaded",()=>{
        tweets= JSON.parse(localStorage.getItem("tweets")) || [];
        crearHTML();
    })
}

//FUNCIONES


function agregarTweet(e){
    limpiarHTML();
    e.preventDefault();
    const tweet = document.querySelector("#tweet").value; //quiero que cuando haga haga click en submit me lea el valor de lo que hay en tweet.
    //validacion
    if(tweet===""){
        mostrarError("NO PUEDE IR VACIO");
        return; //este return evita que se ejecuten mas codigos, este return funciona en un if porque este dentro de una funcion
    }

    const tweetObj= {
        id: Date.now(),
        tweet: tweet
    }
// anadir al arreglo de tweets.
    tweets = [...tweets, tweetObj];
    console.log(tweets);
    crearHTML();
    formulario.reset(); //lo hacemos para que lo que queda escrito dentro del form se resetee, por eso lo ponemos al final de la funcion.
    
}

function mostrarError(error){
    crearHTML();
    const mensajeError = document.createElement("p");
    mensajeError.textContent = error;
    mensajeError.classList.add("mensajeError");
    //formulario.appendChild(mensajeError);

    // escribimos este codigo para que el mensaje no se repite cada vez que presionemos agregar y no haya nada.
    const errorDuplicado = document.querySelectorAll(".mensajeError");
    if(errorDuplicado.length===0){
       formulario.appendChild(mensajeError);
    }
    setTimeout(()=>{
        mensajeError.remove();
    }, 3000)   
}

function crearHTML(){
    limpiarHTML();
    if(tweets.length>0){
        tweets.forEach((tweet)=>{
            //agregar un boton para eliminar los elemento li.
            const btnEliminar = document.createElement("a");
            btnEliminar.classList.add("eliminar-tweet");
            btnEliminar.innerText= ("X");

            //anaidr la funcion de eliminar
            btnEliminar.onclick= ()=> {
                borrarTweet(tweet.id);  
            }
            //crear html
            const li = document.createElement("li");
            li.classList.add("li-tweets")
            //anadir el texto
            li.textContent = tweet.tweet;
            // asignar el boton
            li.appendChild(btnEliminar);
            //insertarlo en listatweets
            listaTweets.appendChild(li);
        } )
    }
    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem("tweets", JSON.stringify(tweets));
}

function borrarTweet(id){
    tweets= tweets.filter(tweet => tweet.id !== id); //filter nos creara un nuevo arreglo sin el elemento que tiene el id que clickeamos.
    crearHTML();
}

//limpiar el html para que no se imprima el ultimo valor antes del agregado recientemente.
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}