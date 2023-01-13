/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import URL from '../common/Global'
import SimpleReactValidator from 'simple-react-validator'


class CrearPaciente extends Component {
    url = URL.API
    nombreLibroRef = React.createRef();
    ISBNRef = React.createRef();
    autorRef = React.createRef();
    editorialRef = React.createRef();
    paginasRef = React.createRef();
    //fotoRef = React.createRef()
    //fechaRef = React.createRef()

    state = {
        user: {},
        status: null,
        photo: null,
        force: false
    }

    validator = new SimpleReactValidator()

    changeState = () => {
        this.setState({
            user: {
                nombreLibro: this.nombreLibroRef.current.value,
                ISBN: this.ISBNRef.current.value,
                autor: this.autorRef.current.value,
                editorial: this.editorialRef.current.value,
                paginas: this.paginasRef.current.value
            }
        })

        this.validator.showMessages()
        this.forceUpdate()
    }

    fileChange = (e) => {
        this.setState({
            photo: e.target.files[0]
        })
    }

    newUser = (e) => {
        e.preventDefault()
        this.changeState()
        if (this.validator.allValid()) {
            axios.post(this.url + "libro/", this.state.user).then(res => {
                if (res.data.newUser) {
                    this.setState({
                        user: res.data.newUser,
                        status: 'waiting'
                    })
                    if (this.state.photo !== null) {
                        console.log(this.state.user);
                        var id = this.state.user._id
                        const formData = new FormData()
                        formData.append('file', this.state.photo, this.state.photo.portada) //ACA TENGO DUDA EN EL PHOTO.NAME  ESTARA BIEN AHI?

                        axios.post(this.url + "/libro/photo/" + id, formData).then(res => {
                            if (res.data.user) {
                                this.setState({
                                    user: res.data.user,
                                    status: 'success',
                                    force: true
                                })
                            } else {
                                this.setState({
                                    user: res.data.user,
                                    status: 'error'
                                })
                            }
                        })
                    } else {
                        this.setState({
                            status: 'success'
                        })
                    }
                } else {
                    this.setState({
                        status: 'success'
                    })
                }
            })
        } else {
            this.validator.showMessages()
            this.forceUpdate()
            this.setState({
                status: 'error'
            })
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.newUser}>
                <table>
                        <thead>
                            
                        </thead>
                        <tbody>
                            <tr>
                                <td><label>NOMBRE LIBRO</label></td>
                                <td><input type="text" name="nombreLibro" ref={this.nombreLibroRef} onChange={this.nombreLibroRef.setState} /></td>
                                {
                                    this.validator.message('nombreLibro', this.state.user.nombreLibro, 'required|alpha_space')
                                }
                            </tr>
                            <tr>
                                <td><label>ISBN</label></td>
                                <td><input type="text" name="ISBN" ref={this.ISBNRef} onChange={this.ISBNRef.setState} /></td>
                                {
                                    this.validator.message('ISBN', this.state.user.ISBN, 'required|alpha')
                                }
                            </tr>
                            <tr>
                                <td><label>AUTOR</label></td>
                                <td><input type="text" name="autor" ref={this.autorRef} onChange={this.autorRef.setState} /></td>
                                {
                                    this.validator.message('autor', this.state.user.autor, 'required|alpha')
                                }
                            </tr>
                            <tr>
                                <td><label>EDITORIAL</label></td>
                                <td><input type="text" name="editorial" ref={this.editorialRef} onChange={this.editorialRef.setState} /></td>
                                {
                                    this.validator.message('editorial', this.state.user.editorial, 'required|alpha')
                                }
                            </tr>
                            <tr>
                                <td><label>PAGINAS</label></td>
                                <td><input type="text" name="paginas" ref={this.paginasRef} onChange={this.paginasRef.setState} /></td>
                                {
                                    this.validator.message('paginas', this.state.user.paginas, 'required|integer')
                                }
                            </tr>
                            
                            <tr>
                                <td><label>PORTADA</label></td>
                                <td><input type="file" name="portada" onChange={this.fileChange} /></td>
                            </tr>
                            <tr>
                                <td onClick={this.changeState}><input type="submit" value="Crear libro" /></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                {
                    this.state.force && <Redirect to="/libros/listar"></Redirect>
                }
            </div>
        )
    }
}


export default CrearPaciente;