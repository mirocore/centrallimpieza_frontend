export const sortArray = (array, orden = "") => {

    array.forEach( item => {
      if(!item.category){
        item.category = {
          name: "Sin categoría"
        }
      }
    } )


    switch( orden ){
        case "reciente":
            return array.sort(function(a, b) {
                let itemA = a._id.toUpperCase(); 
                let itemB = b._id.toUpperCase(); 
                if (itemA < itemB) {
                  return 1;
                }
                if (itemA > itemB) {
                  return -1;
                }
                return 0;
        });
        case "antiguo":
            return array.sort(function(a, b) {
                let itemA = a._id.toUpperCase(); 
                let itemB = b._id.toUpperCase(); 
                if (itemA < itemB) {
                  return -1;
                }
                if (itemA > itemB) {
                  return 1;
                }
                return 0;
        });
        case "name-az":
            return array.sort(function(a, b) {
                let itemA = a.name.toUpperCase(); 
                let itemB = b.name.toUpperCase(); 
                if (itemA < itemB) {
                  return -1;
                }
                if (itemA > itemB) {
                  return 1;
                }
                return 0;
        }); 
        case "name-za":
            return array.sort(function(a, b) {
                let itemA = a.name.toUpperCase(); 
                let itemB = b.name.toUpperCase(); 
                if (itemA < itemB) {
                  return 1;
                }
                if (itemA > itemB) {
                  return -1;
                }
                return 0;
              });
        case "medi-az":
            return array.sort(function(a, b) {
                let itemA = a.medida.toUpperCase(); 
                let itemB = b.medida.toUpperCase(); 
                    if (itemA < itemB) {
                        return -1;
                    }
                    if (itemA > itemB) {
                        return 1;
                    }
                        return 0;
                }); 
        case "medi-za":
            return array.sort(function(a, b) {
                let itemA = a.medida.toUpperCase(); 
                let itemB = b.medida.toUpperCase(); 
                    if (itemA < itemB) {
                        return 1;
                    }
                    if (itemA > itemB) {
                        return -1;
                    }
                        return 0;
                });
                case "cate-az":
                  return array.sort(function(a, b) {
                      let itemA = a.category.name.toUpperCase(); 
                      let itemB = b.category.name.toUpperCase(); 
                          if (itemA < itemB) {
                              return -1;
                          }
                          if (itemA > itemB) {
                              return 1;
                          }
                              return 0;
                      }); 
              case "cate-za":
                  return array.sort(function(a, b) {
                      let itemA = a.category.name.toUpperCase(); 
                      let itemB = b.category.name.toUpperCase(); 
                          if (itemA < itemB) {
                              return 1;
                          }
                          if (itemA > itemB) {
                              return -1;
                          }
                              return 0;
                      });
              case "cant-me":
                return array.sort(function(a, b) {
                    let itemA = a.cantidad; 
                    let itemB = b.cantidad; 
                        if (itemA < itemB) {
                            return -1;
                        }
                        if (itemA > itemB) {
                            return 1;
                        }
                            return 0;
                    }); 
              case "cant-ma":
                  return array.sort(function(a, b) {
                      let itemA = a.cantidad; 
                      let itemB = b.cantidad; 
                          if (itemA < itemB) {
                              return 1;
                          }
                          if (itemA > itemB) {
                              return -1;
                          }
                              return 0;
                      });
              case "prec-me":
                return array.sort(function(a, b) {
                    let itemA = a.price; 
                    let itemB = b.price; 
                        if (itemA < itemB) {
                            return -1;
                        }
                        if (itemA > itemB) {
                            return 1;
                        }
                            return 0;
                    }); 
              case "prec-ma":
                  return array.sort(function(a, b) {
                      let itemA = a.price; 
                      let itemB = b.price; 
                          if (itemA < itemB) {
                              return 1;
                          }
                          if (itemA > itemB) {
                              return -1;
                          }
                              return 0;
                      });              
        default:
            return array;
    }


}