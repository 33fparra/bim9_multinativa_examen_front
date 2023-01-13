import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import URL from '../common/Global'
import SimpleReactValidator from 'simple-react-validator'


class ListarPaciente extends Component {
    url = URL.API

    state = {
        users: [],
        status: null
    }

    componentDidMount() {
        var start = this.props.home
        var search = this.props.search
        if (search && search !== null && search !== undefined) {
            this.getUsersBySearch(search)
        } else {
            this.getUsers()
        }
    }

    getUsers = () => {
        axios.get(this.url + 'libros/').then(res => {
            this.setState({
                users: res.data.libro,
                status: 'success'
            })
        })
    }

    getLastsUsers = () => {
        axios.get(this.url + 'libros/last').then(res => {
            this.setState({
                users: res.data.libro,
                status: 'success'
            })
        })
    }

    getUsersBySearch2 = (search) => {
        axios.get(this.url + 'libro/search/' + search).then(res => {
            if (res.data.libro) {
                this.setState({
                    users: res.data.libro,
                    status: 'success'
                })
            } else {
                this.setState({
                    users: res.data.libro,
                    status: 'error'
                })
            }
        })
    }

    getUsersBySearch = (search)=>{
        axios.get(this.url + 'libro/search/' + search).then(res=>{
            if(res.data.libros){
                this.setState({
                    users: res.data.libros,
                    state: 'success'
                })
            }else{
                this.setState({
                    users: res.data.libro,
                    state: 'error'
                })
            }
        })
    }
    render() {
        if (this.state.users.length >= 1) {
            return (
                <table border="1">
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
                                return (<tr key={u._id}>
                                    <td>{u.ISBN}</td>
                                    <td>{u.nombreLibro}</td>
                                    <td>
                                        {u.portada != null ? (
                                                <img src={u.portada} alt={u.nombreLibro} height="100px" width="100px"></img>
                                            ) : (
                                                <img src="https://www.rockombia.com/images/upload/rockombia-201504171429313975.jpg?" alt={u.nombreLibro} height="100px" width="100px"></img>
                                            )
                                        }
                                    </td>
                                    <td><Link to={'/libro/detalle/' + u._id}>Detalles</Link></td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>)
        } else if (this.state.users.length === 0 && this.state.users === 'success') {
            return (
                <div>
                    <h2>No users to show</h2>
                </div>
            )
        } else {
            return (
                <div>
                    <h2>Taking so long...</h2>
                </div>
            )
        }
    }
}

export default ListarPaciente