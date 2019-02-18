import React, {Component} from 'react';

class Resultado extends Component {

    mostrarImagenes = () => {
        const imagenes = this.props.imagenes;

        if(imagenes.length === 0) return null;

        console.log(imagenes);
    };

    render() {
        return (
            <React.Fragment>
                {this.mostrarImagenes()}
            </React.Fragment>
        );
    }
}

export default Resultado;