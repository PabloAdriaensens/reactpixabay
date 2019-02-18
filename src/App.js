import React, {Component} from 'react';
import Buscador from "./componentes/Buscador";

class App extends Component {

    state = {
        termino: '',
        imagenes: []
    };

    consultarApi = () => {
        const termino = this.state.termino;
        const url = `https://pixabay.com/api/?key=11641811-3abf9954337f75e26113e414c&q=${termino}&per_page=30`;

        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => this.setState({imagenes: resultado.hits}))
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
