import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'
import axios from 'axios'
import URL from '../common/Global'
import SimpleReactValidator from 'simple-react-validator'


class DetalleLibro extends Component{
    url = URL.API

    state = {
        user: false,
        status: null
    }

    componentDidMount(){
        this.getUserById()
    }

    getUserById = () => {
        var id = this.props.match.params.id;
        axios.get(this.url + '/libro/' + id).then(res => {
            if(res){
                this.setState({
                    user: res.data.libro,
                    status: 'success'
                })
            }
        }).catch(err => {
            this.setState({
                user: false,
                status: 'success'
            })
        })
    }

    deleteUserById = (id) => {
        axios.delete(this.url + "/libro/" + id).then(res =>{
            this.setState({
                user: res.data.user,
                status: 'deleted'
            })
        })
    }

    render(){
        return(
            <div>
                {
                    this.state.status === 'deleted' && <Redirect to="/libro/listar"></Redirect>
                }
                {
                    this.state.user &&
                    <div>
                        <table border="1px">
                            <tr>
                                <td>PLIBRO</td>
                                <td>{this.state.user.nombre}</td>
                            </tr>
                            {/* <tr><td>CREADO A LAS</td><td>{this.state.user.fechaIngreso}</td></tr> */}
                            <tr>
                                <td>ISBN</td>
                                <td>{this.state.user.run}</td>
                            </tr>
                            <tr>
                                <td>PORTADA</td>
                                {
                                    this.state.user.portada !== null? (
                                        <img src={this.state.user.portada} alt={this.state.user.nombreLibro} width="275px" height="275px"></img>
                                    ) : (
                                        <img src="https://pbs.twimg.com/media/ERfnjPtWoAYbAad.jpg" alt={this.state.user.nombreLibro} width="275px" height="250px"></img>
                                    )   
                                }
                            </tr>
                            <tr>
                                <td><Link to={'/libro/actualizar/'+this.state.user._id}>Actualizar</Link></td>
                                <td><button onClick={()=>{this.deleteUserById(this.state.user._id)}}>Borrar</button></td>
                            </tr>
                        </table>
                    </div>
                }
                {
                    !this.state.user && this.state.status === 'success' &&
                    <div>
                        <h2>No encontrado</h2>
                        <h3>Prueba más tarder</h3>
                        <Link to={'/'}>Volver</Link>
                    </div>
                }
                {
                    this.state.status == null &&
                    <div>
                        <h2>Cargando.-.-.-.</h2>
                    </div>
                }
            </div>
        )
    }
}
export default DetalleLibro