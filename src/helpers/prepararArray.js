export const prepararArray = (listado = []) => {
    if(listado){

        let lista = listado.map( (product) => {
          product.category = product.category.name;
          return product;
        } )

        let nuevaLista = groupBy(lista, "category");
        var listaDefinitiva = [];
        for( const ind in nuevaLista ){
          listaDefinitiva.push({
            name: ind,
            items: nuevaLista[ind]
          })
        }

        return listaDefinitiva;

      }
}




  


const groupBy = (list, props) => {
    return list.reduce((a, b) => {
       (a[b[props]] = a[b[props]] || []).push(b);
       return a;
    }, {});
  }