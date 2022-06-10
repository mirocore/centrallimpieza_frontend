import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { categoryStartAdd, categoryStartSetActive, categoryStartUpload } from '../../actions/categorias'
import { uiRemoveError, uiSetError } from '../../actions/ui'
import { useForm } from '../../hooks/useForm'
import { AlertError } from '../ui/AlertError'


export const CategoriaEdit = () => {
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();


    const [formValues, setFormValues] = useState({
        name:"",
    })

    const handleChange = e => {
        setFormValues({
            ...formValues,
            [e.target.name] : e.target.value
        })
    }

    const { name} = formValues;
    

    useEffect( () => {
        if(id){
            dispatch( categoryStartSetActive(id) )
            dispatch(uiRemoveError())
        }
    },[dispatch])

    const {categoryActive} = useSelector(state => state.category)
    
    useEffect( () => {
        if(categoryActive){
            setFormValues({
                name: categoryActive.name
            })
        }
    },[categoryActive] )

    

    // Manejar el error
    const { error, navegador } = useSelector( state => state.ui );

    // Use effect para manejar la vuelta al listado
    useEffect( () => {
        if(navegador){
            navigate("/admin/categorias")
        }
    },[navegador] )
    

    // Submit
    const handleCategorySubmit = async(e) => {
        e.preventDefault();

        // VALIDAR
        if( name === ""){
            dispatch( uiSetError("Por favor complete todos los campos del formulario") )
            return
        }
        dispatch( uiRemoveError() );
        
        // ENVIAR
        const nuevaInfo = {name}
        dispatch( categoryStartUpload( id, nuevaInfo ) )
    }

    
    
  
  return (<>

        {
            !id ? (
                <div className="row">
                    <div className="col">
                        <Link to="/admin/categorias" >Volver al listado</Link>
                    </div>
                </div>
            ) : (<>

        <div className="row">
            <div className="col">
                <Link to="/admin/categorias" >Volver al listado</Link>
            </div>
        </div>
      <div className="row">
          <div className="col-12">

      {
          categoryActive ? 
          (

                 

            <div className="card my-4 shadow rounded-0">
                <div className="card-header bg-primary rounded-0">
                  <h2 className="h4 text-white my-2">Editar Categoría</h2>
                </div>


                <div className="card-body bg-white">

                    {
                        error.state && <AlertError msg={error.msg} />
                    }
                    
                    
                    
                    <form onSubmit={handleCategorySubmit}>
                        <div className="row">

                            <div className="form-group col-12  my-2">
                                <label htmlFor="name">Nombre</label>
                                <input 
                                    type="text"
                                    className={`form-control ${ error.state && name === "" &&  "is-invalid" }`}
                                    id="name"
                                    name="name"
                                    placeholder="Nombre de la categoría"
                                    onChange={handleChange}
                                    value={ name }
                                />
                            </div>

                            

                            <div className="form-group col-12 my-2">
                                <button type="submit" className="btn btn-primary w-100">Editar Categoría</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>

            ) : <div className="alert alert-danger mt-5">La página a la que intenta ingresar es inválida</div>
            } 
          </div>
      </div>
      </>)
    }
      </>
  )
}
