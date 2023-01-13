import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import URL from '../common/Global'
import SimpleReactValidator from 'simple-react-validator'


class Home extends Component {
    url = URL.API

    state = {
        users: [],
        status: null
    }

    componentDidMount() {
        this.getLastFive();
    }

    getLastFive = () => {
        axios.get(this.url + "pacientes/5").then(res => {
            this.setState({
                users: res.data.paciente,
                status: 'Success'
            })
        })
    }


    render() {
        if (this.state.users.length ) {

            return (
                <table>
                    <thead>
                    <tr>
                            <td>NOMBRE LIBRO</td>
                            <td>ISBN</td>
                            <td>PORTADA</td>
                            <td>ADM OPTIONS</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map((u) => {
                                return (
                                    <tr key={u._id}>
                                        <td>{u.nombreLibro}</td>
                                        <td>{u.ISBN}</td>
                                        <td>
                                            {
                                                u.photoPersonal != null ? (
                                                    <img src={u.portada} alt={u.nombreLibro} height="100px" width="100px"></img>
                                                ) : (
                                                    <img src="https://pbs.twimg.com/media/ERfnjPtWoAYbAad.jpg" alt={u.nombreLibro} height="100px" width="100px"></img>
                                                )
                                            }
                                        </td>
                                        <td><Link to={'/paciente/detalle/' + u._id}>Detalles</Link></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            )
        } else if (this.state.users.length === 0 && this.state.users === 'success') {
            return (
                <div>
                    <h2>No users to show</h2>
                </div>
            )
        } else {
            return (
                <div>
                    <h2>Taking so long...(este es el componente Home)</h2>
                </div>
            )
        }
    }
}

export default Home