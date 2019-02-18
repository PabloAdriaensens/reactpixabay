import React, {Component} from 'react';
import Buscador from "./componentes/Buscador";
import Resultado from "./componentes/Resultado";
import './css/App.css'

class App extends Component {

    state = {
        termino: '',
        imagenes: [],
        pagina: '',
        cargando: false,
        totalPaginas: ''
    };

    consultarApi = async () => {
        const termino = this.state.termino;
        const pagina = this.state.pagina;
        const url = `https://pixabay.com/api/?key=11641811-3abf9954337f75e26113e414c&q=${termino}&per_page=30&page=${pagina}`;

        console.log(url);

        await fetch(url)
            .then(respuesta => {
                this.setState({
                    cargando: true
                });
                return respuesta.json()
            })
            // El timeout no es necesario... solo lo utilizamos para simular
            .then(resultado => {
                console.log(resultado.totalHits);
                const totalPaginacion = Math.ceil(resultado.totalHits / 30);

                setTimeout(() => {
                    this.setState({
                        imagenes: resultado.hits,
                        cargando: false,
                        totalPaginas: totalPaginacion
                    })
                }, 500);
            })
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
        let {pagina }= this.state;
        const {totalPaginas} = this.state;

        if (pagina === totalPaginas) return null;

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

        const cargando = this.state.cargando;

        let resultado;

        if (cargando) {
            resultado = <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
            </div>
        } else {
            resultado = <Resultado
                imagenes={this.state.imagenes}
                paginaAnterior={this.paginaAnterior}
                paginaSiguiente={this.paginaSiguiente}
                pagina={this.state.pagina}
                totalPaginas={this.state.totalPaginas}
            />
        }

        return (
            <div className="app container">
                <div className="jumbotron">
                    <p className="lead text-center">Buscador de Imágenes</p>
                    <Buscador
                        datosBusqueda={this.datosBusqueda}
                    />
                </div>
                <div className="row justify-content-center">
                    {resultado}
                </div>
            </div>
        );
    }
}

export default App;
