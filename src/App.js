import React, {Component} from 'react';
import Buscador from "./componentes/Buscador";
import Resultado from "./componentes/Resultado";

class App extends Component {

    state = {
        termino: '',
        imagenes: [],
        pagina: ''
    };

    consultarApi = () => {
        const termino = this.state.termino;
        const pagina = this.state.pagina;
        const url = `https://pixabay.com/api/?key=11641811-3abf9954337f75e26113e414c&q=${termino}&per_page=30&page=${pagina}`;

        console.log(url);

        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => this.setState({imagenes: resultado.hits}))
    };

    datosBusqueda = (termino) => {
        this.setState({
            termino: termino,
            pagina: 1
        }, () => {
            this.consultarApi();
        })
    };

    paginaAnterior = () => {

        // Leemos el state
        let pagina = this.state.pagina;

        // Si es la página 1, ya no podemos retroceder
        if (pagina === 1) return null;

        // Restar a la página actual
        pagina -= 1;

        // Agregar al state
        this.setState({
            pagina
        }, () => {
            this.consultarApi();
            this.scroll();
        });

        // console.log(pagina);
    };

    paginaSiguiente = () => {

        // Leemos el state
        let pagina = this.state.pagina;

        // Sumar a la página actual
        pagina += 1;

        // Agregar al state
        this.setState({
            pagina
        }, () => {
            this.consultarApi();
            this.scroll();
        });

        // console.log(pagina);
    };

    scroll = () => {
        const elemento = document.querySelector('#resultado');
        elemento.scrollIntoView('auto', 'start');
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
                <div className="row justify-content-center">
                    <Resultado
                        imagenes={this.state.imagenes}
                        paginaAnterior={this.paginaAnterior}
                        paginaSiguiente={this.paginaSiguiente}
                    />
                </div>
            </div>
        );
    }
}

export default App;
