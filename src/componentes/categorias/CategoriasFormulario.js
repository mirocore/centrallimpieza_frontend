import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { categoryStartAdd } from '../../actions/categorias'
import { uiRemoveError, uiSetError } from '../../actions/ui'
import { useForm } from '../../hooks/useForm'
import { AlertError } from '../ui/AlertError'


export const CategoriasFormulario = () => {
  
    


    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect( () => {
        dispatch(uiRemoveError())
    }, [dispatch] )
    
    // UseForm
    const [ formValues, handleInputChange] = useForm({
        name: ""
    })
    const {name} = formValues;

    // Manejar el error
    const { error, navegador } = useSelector( state => state.ui );

    // Submit
    const handleCategorySubmit = async(e) => {
        e.preventDefault();

        // VALIDAR
        if( name === ""){
            dispatch( uiSetError("El nombre de la categoría es obligatorio") )
            return
        }
        dispatch( uiRemoveError() );
        
        // ENVIAR
        dispatch( categoryStartAdd( name) )

    }

    // Use effect para manejar la vuelta al listado
    useEffect( () => {
        if(navegador){
            navigate("/admin/categorias")
        }
    },[navegador] )
    
  
  return (<>
        <div className="row">
            <div className="col">
                <Link to="/admin/categorias" >Volver al listado</Link>
            </div>
        </div>
      <div className="row">
          <div className="col-12">
              

            <div className="card my-4 shadow rounded-0">
                <div className="card-header bg-success rounded-0">
                  <h2 className="h4 text-white my-2">Crear Categoría</h2>
                </div>


                <div className="card-body bg-white">

                    {
                        error.state && <AlertError msg={error.msg} />
                    }
                    
                    
                    
                    <form onSubmit={handleCategorySubmit}>
                        <div className="row">

                            <div className="form-group col-12">
                                <label htmlFor="name">Nombre</label>
                                <input 
                                    type="text"
                                    className={`form-control ${ error.state && name === "" &&  "is-invalid" }`}
                                    id="name"
                                    name="name"
                                    placeholder="Nombre de la categoría"
                                    onChange={handleInputChange}
                                    value={ name }
                                />
                            </div>

                           

                            <div className="form-group col-12 my-2">
                                <button type="submit" className="btn btn-success w-100">Crear Categoría</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>

            
          </div>
      </div>
      </>
  )
}
