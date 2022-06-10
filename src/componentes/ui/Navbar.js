import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { startLogout } from '../../actions/auth';

export const Navbar = () => {

    const {uid} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch( startLogout() );
    }

    return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-navbar-cl">
            <div className="container d-flex justify-content-around">

            <Link className="navbar-brand text-white" to="/">Central Limpieza</Link>
        
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto  align-items-center">
                    {
                        !!uid ? (
                        <li className="nav-item mx-2">
                            <Link className="text-white my-0" to="/">
                                    Inicio
                            </Link>
                        </li>
                        ) : null
                    }

                    {
                        !!uid ? (
                        <li className="nav-item mx-2">
                            <Link className="text-white" to="/admin">
                                Admin
                            </Link>
                        </li>
                        ) : null
                    }

                    {
                        !!uid ? (
                        <li className="nav-item mx-2">
                            <button onClick={ handleLogout } className="btn btn-danger rounded-0">Logout</button>
                        </li>
                        ) : null
                    }
                    
                    

                    {
                        !uid ? (
                        <li className="nav-item mx-2">
                            <Link className="text-white" to="/login">
                                Login
                            </Link>
                        </li>
                        ) : null
                    }
                    
                </ul>
            </div>

            </div>
        </nav>
    </>
  )
}
