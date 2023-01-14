import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import Search from '../components/BuscarLibro';

class Nav extends Component {
    render() {
        var cabecera = "Examen"
        return (
            <div>
                <h1>{cabecera}</h1>
                <div className='menu-header'>
                    <div className='menu'><NavLink to="/">Inicio</NavLink></div>
                    <div className='menu'><NavLink to="/libro/nuevo">Agregar Libro</NavLink></div>
                    <div className='menu'><NavLink to="/libros/listar">Listar Libros</NavLink></div>

                    <div className='Seeker'><Search></Search></div>
                </div>
                <div className='menu-footer'></div>
            </div>
        );
    }
}


export default Nav;