import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { authStartLogin } from '../../actions/auth';

export const LoginScreen = () => {

  const [ formError, setFormError ] = useState(false);

  const [ formValue, setFormValue ] = useState({
    email: "ramirobelcore@gmail.com",
    password: "1234567"
  })

  const { email, password } = formValue;

  const handleChange = ({ target }) => {
      setFormValue({
        ...formValue,
        [target.name] : target.value
      })
  }

  const dispatch = useDispatch();

  const handleSubmit = e => {
      e.preventDefault();

      // VALIDAR
      if( email === "" || password === "" ){
        setFormError(true);
        return
      }
      setFormError(false);

      // LLamo al dispatch
      dispatch( authStartLogin( email, password ) )

  }

  return (
    <>
    <div className="row mt-5">
      <div className="col-12 col-sm-6 offset-sm-3">
      <h1 className="text-center mb-5">Login</h1>

      {
        formError && <div className="alert alert-danger">Por favor complete todos los campos del formulario</div>
      }

      <form onSubmit={ handleSubmit }>
          <div className="form-group mt-2">
            <label className="mb-1" htmlFor="email" >Email</label>
            <input
              name="email"
              className="form-control"
              id="name"
              type="text"
              placeholder="Ingrese su email"
              onChange={ handleChange }
              value={ email }
              autoComplete="off"
            />
          </div>

          <div className="form-group mt-2">
            <label className="mb-1" htmlFor="password" >Password</label>
            <input
              name="password"
              className="form-control"
              id="password"
              type="password"
              placeholder="Ingrese su contraseña"
              onChange={ handleChange }
              value={ password }
            />
          </div>

          <button className="btn btn-primary w-100 mt-3">
            Ingresar
          </button>
      </form>
      </div>
    </div>
      
    </>
  )
}
