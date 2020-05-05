export class elemento {
  constructor() {

  }

  create( element, otherElement ) {
    if ( typeof element === "undefined" )
      return null;
    
    // Crear un elemento:
    let elemento = document.createElement( element );

    // Colocarlo en otro elemento:
    if ( typeof otherElement !== "undefined" )
      otherElement.appendChild( elemento );

    if ( typeof objeto === "undefined" )
      return [];


    return elemento;
  }
}

let objeto = new elemento();

let layer = objeto.create( "div", footer );
let html = objeto.create( "audio", layer );

html.textContent = "Ciencia al desnudo";

html.src = `http://info.lunamontilla.net/music/Piano%202.mp3`;
html.controls = "on";
html.loop = "on";
html.autoplay = "on";

html.ontimeupdate = (e) => {
  console.clear();
  console.log(html.currentTime, " / ", html.duration, " = ", (html.currentTime/html.duration) * 100);
}

if ( typeof aviso !== "undefined" )
  aviso.ontimeupdate = () => {
    console.log(html);
  }

console.log( html );