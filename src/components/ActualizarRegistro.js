import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import URL from '../common/Global'
import SimpleReactValidator from 'simple-react-validator'

class ActualizarRegistro extends Component {
    url = URL.API
    nombreLibroRef = React.createRef();
    ISBNRef = React.createRef();
    autorRef = React.createRef();
    editorialRef = React.createRef();
    paginasRef = React.createRef();
    userId = null

    state = {
        user: {},
        status: null,
        photo: null,
        new: ''
    }

    componentDidMount() {
        this.userId = this.props.match.params.id
        this.getUserById(this.userId)
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

    getUserById = (id) => {
        axios.get(this.url + '/libro/' + id).then(res => {
            this.setState({
                user: res.data.libro
            })
        })
    }

    UpdateUser = (e) => {
        e.preventDefault()
        this.changeState()
        if (this.validator.allValid()) {
            axios.put(this.url + "/libro/" + this.userId, this.state.user).then(res => {
                console.log(this.state.user)
                if (res.data.user) {
                    this.setState({
                        user: res.data.user,
                        status: 'waiting'
                    })
                    if (this.state.photo !== null) {
                        var id = this.state.user._id
                        const formData = new FormData()
                        formData.append('file', this.state.photo, this.state.photo.portada)  //portada el elemento photo esta bien o me confundo al trabajar ambos?   FOTO, FILE, PORTADA


                        axios.post(this.url + "/libro/photo/" + id, formData).then(res => {
                            if (res.data.user) {
                                this.setState({
                                    user: res.data.user,
                                    status: 'success'
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
        if (this.state.status === 'success') {
            return <Redirect to={'/libro/listar'}></Redirect>
        }
        var user = this.state.user
        return (
            <div>
                <form onSubmit={this.UpdateUser}>
                    <table>
                        <thead>
                        </thead>
                        <tbody>
                            <tr>
                                <td><label>NOMBRE LIBRO</label></td>
                                <td><input type="text" name="nombreLibro" defaultValue={user.nombreLibro} ref={this.nombreLibroRef} onChange={this.changeState} /></td>
                                {
                                    this.validator.message('nombreLibro', this.state.user.nombreLibro, 'required|alpha_space')
                                }
                            </tr>
                            <tr>
                                <td><label>ISBN</label></td>
                                <td><input type="text" name="ISBN" defaultValue={user.ISBN} ref={this.ISBNRef} onChange={this.changeState} /></td>
                                {
                                    this.validator.message('ISBN', this.state.user.ISBN, 'required|alpha_space')
                                }
                            </tr>
                            <tr>
                                <td><label>AUTOR</label></td>
                                <td><input type="text" name="autor" defaultValue={user.autor} ref={this.autorRef} onChange={this.changeState} /></td>
                                {
                                    this.validator.message('autor', this.state.user.autor, 'required|alpha_space')
                                }
                            </tr>
                            <tr>
                                <td><label>EDITORIAL</label></td>
                                <td><input type="text" name="editorial" defaultValue={user.editorial} ref={this.editorialRef} onChange={this.changeState} /></td>
                                {
                                    this.validator.message('editorial', this.state.user.editorial, 'required|alpha_space')
                                }
                            </tr>
                            <tr>
                                <td><label>PAGINAS</label></td>
                                <td><input type="text" name="paginas" defaultValue={user.paginas} ref={this.paginasRef} onChange={this.changeState} /></td>
                                {
                                    this.validator.message('paginas', this.state.user.paginas, 'required|integer')
                                }
                            </tr>
                            <tr>
                                <td><input type="submit" value="Actualizar Libro" onClick={this.changeState} /></td>
                                    <td><Link to={'/libro/listar'}>Cancelar</Link></td>
                            </tr>


                        </tbody>


                    </table>
                </form>
            </div>

        )
    }
}
export default ActualizarRegistro