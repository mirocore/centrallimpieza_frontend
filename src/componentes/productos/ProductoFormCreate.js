import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { categoryStartLoad } from '../../actions/categorias'
import { productsStartAdd } from '../../actions/productos'
import { uiRemoveError, uiSetError } from '../../actions/ui'
import { AlertError } from '../ui/AlertError'


export const ProductosFormCreate = () => {
  

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Cuando empieza, remueve el error y cargo las categorías
    useEffect( () => {
        dispatch(uiRemoveError())
        dispatch(categoryStartLoad())
    }, [dispatch] )

    // Busco las categorías
    const { categories } = useSelector( state => state.category )

    // Manejar el error
    const { error, navegador } = useSelector( state => state.ui );
    
    // Valores
    const [ formValues, setFormValues ] = useState({
        name: "",
        price: "",
        cantidad: "",
        medida: "",
        stock: 1,
        state: 1,
        category: "",
    })

    const { name, price, cantidad, stock, state, category, medida } = formValues

    // Handle Input change
    const handleInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [ target.name ] : target.value
        })
    }
    
    // Submit
    const handleProductSubmit = async(e) => {
        e.preventDefault();

        // VALIDAR /*
         if(name === ""){
            dispatch( uiSetError("Ingrese el nombre del producto") );
            return;
        }

        if(cantidad === ""){
            dispatch( uiSetError("Ingrese la cantidad") );
            return
        }

        if(price === ""){
            dispatch( uiSetError("Ingrese el precio") );
            return
        }

        if( medida === "" ){
            dispatch( uiSetError("Ingrese una unidad de medida.") );
            return;
        }

        if( category === "" ){
            dispatch( uiSetError("Ingrese una categoría.") );
            return;
        } 
        dispatch( uiRemoveError() );

        // Convierto en números los valores de stock y state
        formValues.state = parseInt(formValues.state);
        formValues.stock = parseInt(formValues.stock);


        // GUARDAR EN LA BASE DE DATOS
        dispatch( productsStartAdd(formValues) );
    }

    // Use effect para manejar la vuelta al listado
    useEffect( () => {
        if(navegador){
            navigate("/admin/productos")
        }
    },[navegador] )
    
  
  return (<>
        <div className="row">
            <div className="col">
                <Link to="/admin/productos" >Volver al listado</Link>
            </div>
        </div>
      <div className="row">
          <div className="col-12">
              

            <div className="card my-4 shadow rounded-0">
                <div className="card-header bg-success rounded-0">
                  <h2 className="h4 text-white my-2">Crear Producto</h2>
                </div>


                <div className="card-body bg-white">

                    {
                        error.state && <AlertError msg={error.msg} />
                    }
                    
                    

                    <form onSubmit={handleProductSubmit}>
                        <div className="row">
                            <div className="form-group col-12 my-2">
                                <label htmlFor="name">Nombre</label>
                                <input 
                                    type="text"
                                    className={`form-control ${ error.state && name === "" &&  "is-invalid" }`}
                                    id="name"
                                    name="name"
                                    placeholder="Nombre del producto"
                                    onChange={handleInputChange}
                                    value={ name }
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col-12 col-sm-4 my-2">
                                <label htmlFor="cantidad">Cantidad</label>
                                <input 
                                    type="number"
                                    id="cantidad"
                                    name="cantidad"
                                    placeholder="¿Por cuantos productos se venden?"
                                    className= {`form-control ${ error.state && cantidad === "" &&  "is-invalid" }`}
                                    onChange={handleInputChange}
                                    value={ cantidad }
                                />
                            </div>

                            <div className="form-group col-12 col-sm-4 my-2">
                                <label htmlFor="price">Precio</label>
                                <input 
                                    type="number"
                                    id="price"
                                    name="price"
                                    placeholder="Precio del producto"
                                    className= {`form-control ${ error.state && price === "" &&  "is-invalid" }`}
                                    onChange={handleInputChange}
                                    value={ price }
                                />
                            </div>

                            <div className="form-group col-12 col-sm-4 my-2">
                                <label htmlFor="price">Medida</label>
                                <select id="medida" name="medida" onChange={handleInputChange} value={category}
                                    className={`form-control ${ error.state && medida === "" &&  "is-invalid" }`}
                                >
                                    <option value="">Seleccionar medida</option>   
                                    <option value="UNIDADES">Unidades</option>   
                                    <option value="LITROS">Litros</option>   
                                    <option value="KILOS">Kilos</option>   
                                </select> 
                            </div>
                            <div className="col-12">
                                <p className="text-muted"><small>El precio individual del producto por unidad, litro o kilo se calcula automáticamente.</small></p>
                            </div>
                        </div>

                        <div className="row">
                            
                            <div className="col-12 col-sm-4 my-2">
                                <label htmlFor="stock">Stock</label>
                                <select 
                                    name="stock" 
                                    id="stock"
                                    className="form-control"
                                    onChange={handleInputChange}
                                    value={ stock }
                                >
                                    <option value="1">Producto en stock</option>
                                    <option value="0">Sin stock</option>
                                </select>
                            </div>

                            <div className="col-12 col-sm-4 my-2">
                                <label htmlFor="state">Estado</label>
                                <select 
                                    name="state" 
                                    id="state"
                                    className="form-control"
                                    onChange={handleInputChange}
                                    value={ state }
                                >
                                    <option value={1}>Activo</option>
                                    <option value={0}>Inactivo</option>
                                </select>
                            </div>

                            <div className="col-12 col-sm-4 my-2">
                                <label htmlFor="category">Categoría</label>
                                <select 
                                    name="category" 
                                    id="category"
                                    className={`form-control  ${ error.state && category === "" &&  "is-invalid" }`}
                                    onChange={handleInputChange}
                                    value={category}
                                >
                                    <option value="">Seleccione una categoría</option>
                                    {
                                        categories.map( category => (
                                            <option key={category._id} value={category._id}>{category.name}</option>
                                        ) )
                                    }
                                </select>
                            </div>

                        </div>
                            


                            <div className="form-group col-12 my-2">
                                <button type="submit" className="btn btn-success w-100">Crear Producto</button>
                            </div>

                        
                    </form>
                </div>
            </div>

            
          </div>
      </div>
      </>
  )
}
