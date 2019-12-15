export class header {
  constructor() {
    console.log("Objeto HEADER creado...");
  }

  create = ( attribute ) => {
    const header = document.createElement("header");
    let condicion = false;

    condicion = typeof attribute === "undefined";
    if ( condicion )
      return header;
    
    condicion = typeof attribute.className !== "undefined";
    if ( condicion )
      header.classList.add( attribute.className );

    
    condicion = typeof attribute !== "undefined" &&
    typeof attribute.create.name !== "undefined" &&
    typeof attribute.create.value !== "undefined";

    if ( condicion )
      header.setAttribute( attribute.create.name, attribute.create.value );

    condicion = typeof attribute.textContent !== "undefined";
    if ( condicion )
      header.textContent = attribute.textContent;
    
    return header;
    
  }
}