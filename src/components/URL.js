import React, {Component} from 'react'

class URL extends Component{
    render(){
        var id= this.props.match.params.id;
        return(
            <div>
                <h2>{id}</h2>
            </div>
        );
    }
}

export default URL;