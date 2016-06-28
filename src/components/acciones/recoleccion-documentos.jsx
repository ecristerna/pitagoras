'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

var AccionesMixin = require('./acciones-mixin');
var DateSelect = require('src/components/shared/date-select');
var TimeSelect = require('src/components/shared/time-select');

// -----------------------------------------------------------------------------------------------
// RecoleccionDocumentos
// -----------------------------------------------------------------------------------------------

var RecoleccionDocumentos = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        return {
            tipo: 6,
            comentarios: '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {
                recogeDocumentos: false

            },
            disabled: false
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.getState(nextProps);
    },
    getState: function (props) {
        this.setState({disabled: props.disabled});
    },
    render: function () {
        return (
            <div className='recoleccion-documentos accion-form'>
                <div>
                    <h5>¿Documentos recogidos?</h5>
                    <div>
                        <input
                            type='radio'
                            id='si'
                            value={1}
                            checked={this.state.respuestas.recogeDocumentos}
                            onChange={this.handleRadioChange}
                            disabled={this.state.disabled} />
                        <label htmlFor='si' disabled={this.state.disabled}>Si</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='no'
                            value={0}
                            checked={!this.state.respuestas.recogeDocumentos}
                            onChange={this.handleRadioChange}
                            disabled={this.state.disabled} />
                        <label htmlFor='no' disabled={this.state.disabled}>No</label>
                    </div>
                    {this.renderTextInputs()}
                </div>
                {this.renderComentarios()}
                {this.renderButton()}
            </div>
        );
    },
    renderTextInputs: function () {
        if (this.state.respuestas.recogeDocumentos) {
            return (
                <div>
                    <div>
                        <h5 className='text-label'>¿Quién recogió?</h5>
                        <input
                            type='text'
                            value={this.state.respuestas.personaRecoge}
                            onChange={this.handleChange.bind(this, 'personaRecoge')}
                            disabled={this.state.disabled} />
                    </div>
                    <div>
                        <h5 className='text-label'>¿Qué recogió?</h5>
                        <input
                            type='text'
                            value={this.state.respuestas.documentosRecogidos}
                            onChange={this.handleChange.bind(this, 'documentosRecogidos')}
                            disabled={this.state.disabled} />
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div>
                    <h5>Nueva Fecha</h5>
                    <DateSelect date={this.state.respuestas.fecha} onChange={this.handleFechaChange} />
                </div>
                <div>
                    <label className='text-label'>Hora</label>
                    <TimeSelect time={this.state.respuestas.hora} onChange={this.handleHoraChange} />
                </div>
            </div>
        );
    },
    handleChange: function (key, event) {
        var respuestas = this.state.respuestas;
        respuestas[key] = event.target.value;
        this.setState({respuestas: respuestas});
    },
    handleRadioChange: function (event) {
        var respuestas = this.state.respuestas;
        respuestas.recogeDocumentos = parseInt(event.target.value, 10) === 1;
        this.setState({respuestas: respuestas});
    },
    handleFechaChange: function (date) {
        var state = {respuestas: this.state.respuestas};
        state.respuestas.fecha = date.clone();

        this.setState(state);
    },
    handleHoraChange: function (time) {
        var state = {respuestas: this.state.respuestas};
        state.respuestas.hora = time;

        this.setState(state);
    }
});

module.exports = RecoleccionDocumentos;
