import DataList from "./componentes/datalist.js";

const datalist = new DataList;
datalist.init();

datalist.form(function( data ) {
    console.clear();
    console.log( data );
});