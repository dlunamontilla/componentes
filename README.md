# Componentes Web

## DataList

Para implementar un datalist puede agregar la siguiente estructura HTML:

```html
<div id="datalista" class="list" data-list="">
  <input
    class="list__inner list__inner--text"
    type="text"
    id="opciones2"
    name="opciones2"
    list="options-list"
    placeholder="Enter a tier"
  />

  <!-- Datalist in textbox -->
  <datalist id="options-list-2">
    <option value="1">Valores 1</option>
    <option value="2">Valores 2</option>
    <option value="3">Valores 3</option>
    <option value="4">Valores 4</option>
    <option value="5">Valores 5</option>
    <option value="6">Valores 6</option>
    <option value="7">Valores 7</option>
    <option value="8">Valores 8</option>
    <option value="9">Valores 9</option>
    <option value="10">Valores 10</option>
  </datalist>
  <i class="fa fa-plus list__inner list__inner--icon" data-button=""></i>
</div>
```

Para que la estructura HTML anterior funcione utilizar la siguiente ruta:

``` html
<!-- DataList -->
<link rel="stylesheet" href="https://dlunamontilla.github.io/componentes/vista/css/componentes/datalist.css" />
<script src="https://dlunamontilla.github.io/componentes/app/js/componentes/datalist.js"></script>
```

Después de hacer el paso anterior puede escribir las siguientes líneas:

``` js
const datalist = new DataList;
datalist.init();
```