/* eslint-disable no-undef */
/* eslint-disable react/require-render-return */
/* eslint-disable no-unused-vars */
// en este componente el ESLINT ME TIRO MUCHISIMOS ERRORES

import React, {Component} from 'react';
import ListarLibros from '../components/ListarLibros';
import Search from '../components/BuscarLibro';

class Seeker extends Component{
    render(){
        var field = this.props.match.params.search;
        returm(
            <div>
                <h1>Searching: {field}</h1>
                <ListarLibros buscar={field}></ListarLibros>
                <Search></Search>
            </div>
        );
    }
 }

export default Seeker;