/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import {Redirect} from 'react-router';
import SimpleReactValidator from "simple-react-validator";

class Validator extends Component {
  nombreRef = React.createRef();
  apellidoRef = React.createRef();

  state = {
    persona: {},
  };

  componentWillMount(){
    this.validator = new SimpleReactValidator();
  }

  changeState = () => {
    this.setState({
      persona: {
        nombre: this.nombreRef.current.value,
        apellido: this.apellidoRef.current.value,
      },
    });
    this.validator.showMessages();
    this.forceUpdate();
  };

  validar = (e) =>{
    e.preventDefault();
    this.changeState();
    if (this.validator.allValid()) {
      alert("Los campos son validos");
    } else {
      this.validator.showMessages();
      this.forceUpdate();
      alert("Los campos no son validos");
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.validar}>
          <table>
            <tr>
              <td>
                <label>Nombre</label>
              </td>
              <td>
                <input
                  type="text"
                  name="nombre"
                  ref={this.nombreRef}
                  onChange={this.changeState}
                />
              </td>
              {this.validator.message(
                "nombre",
                this.state.persona.nombre,
                "required|alpha"
              )}
            </tr>
            <tr>
              <td>
                <label>Apellido</label>
              </td>
              <td>
                <input
                  type="text"
                  name="apellido"
                  ref={this.apellidoRef}
                  onChange={this.changeState}
                />
              </td>
              {this.validator.message(
                "apellido",
                this.state.persona.apellido,
                "required|alpha"
              )}
            </tr>
            <tr>
              <td>
                <input type="submit" value="Validar"/>
              </td>
            </tr>
          </table>
        </form>
      </div>
    );
  }
}

export default Validator;
