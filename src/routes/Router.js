/* eslint-disable no-unused-vars */
import React, {Component} from 'react'
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
//components
import Home from '../components/Home';
import CrearRegistro from '../components/NuevoRegistro';
import ListarLibros from '../components/ListarLibros';
import ActualizarRegistro from '../components/ActualizarRegistro';
import DetalleLibro from '../components/DetalleLibro';
import Seeker from '../components/Seeker';
import Search from '../components/BuscarLibro';

//common
import URL from '../common/Global';

//routes
import Nav from '../routes/Nav';
import NotFound from '../routes/404';

class Router extends Component{
    render(){
        return(
            <BrowserRouter forceRefresh={true}>
            <Nav></Nav>
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route exact path="/inicio" component={Home}></Route>
                    <Route exact path="/libro/nuevo" component={CrearRegistro}></Route>
                    <Route exact path="/libro/actualizar/:id" component={ActualizarRegistro}></Route>
                    <Route exact path="/libro/detalle/:id" component={DetalleLibro}></Route>
                    <Route exact path="/libros/listar" component={ListarLibros}></Route>
                    
                    <Route exact path="/libro/search/:search" component={Seeker}></Route>
                    <Route path="/redirect/:search" render={(props)=>{
                        var search = props.match.params.search
                        return(<Redirect to={'/libro/search/'+search}></Redirect>)}}>
                    </Route>

                    {/* Ruta 404 */}
                    <Route path="*" component={NotFound}></Route>

                </Switch>

                
                
                <div className='clearfix'></div>
            </BrowserRouter>
        );
    }
}

export default Router;