import React, {Component} from 'react';

class Buscador extends Component {
    render() {
        return (
            <div className="row">
                <div className="form-group col-md-8">
                    <input className="form-control form-control-lg" type="text" placeholder="Busca tu imagen, ejemplo: Futbol"/>
                </div>
                <div className="form-group col-md-4">
                    <input type="submit" className="btn btn-lg btn-danger btn-block" value="Buscar..."/>
                </div>
            </div>
        );
    }

}

export default Buscador;