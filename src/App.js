import React, {Component} from 'react';
import Buscador from "./componentes/Buscador";

class App extends Component {

    state = {
        termino: ''
    };

    consultarApi = () => {
        console.log('Desde consultarApi');
    };

    datosBusqueda = (termino) => {
        this.setState({
            termino
        }, () => {
            this.consultarApi();
        })
    };

    render() {
        return (
            <div className="app container">
                <div className="jumbotron">
                    <p className="lead text-center">Buscador de Imágenes</p>
                    <Buscador
                        datosBusqueda={this.datosBusqueda}
                    />
                </div>

            </div>
        );
    }
}

export default App;
