import { formulario } from "./componentes/forms.js";
import { header as _header } from "./componentes/header.js";

let objeto = new formulario();
let header = new _header();

objeto.contacto();

const atributo = {
  className: "header",
  textContent: "Ciencia al desnudo",

  create: {
    name : "style",
    value : "border-bottom: 1px solid"
  }
}

main.onclick = () => {
  
}