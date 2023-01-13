import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
//import SimpleReactValidator from 'simple-react-validator';

class Search extends Component {

    searchRef = React.createRef();

    state = {
        search: "",
        redirect: false
    };

    searchByField = (e) => {
        e.preventDefault();
        this.setState({
            search: this.searchRef.current.value,
            redirect: true
        })
    }

    render() {
        if (this.state.redirect) {
            return (
                <Redirect to={'/redirect/' + this.state.search}></Redirect>
            );
        }

        return (
            <div>
                <form onSubmit={this.searchByField}>
                    <div>
                        <input type="text" name="search" ref={this.searchRef} />
                        <input type="submit" name="submit" value="Buscar" />
                    </div>
                </form>
            </div>
        );
    }
}

export default Search;