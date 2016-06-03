'use strict';

var Immutable = require('immutable');
var Parse = require('parse');

var VehiculoObject = Parse.Object.extend('Vehiculo');
var VehiculoRecord = require('./vehiculo');

var ClienteObject = Parse.Object.extend('Cliente');
var ClienteRecord = require('./cliente');

var ContratoRecord = Immutable.Record({
    id: null,
    cliente: null,
    fechaContrato: null,
    monto: null,
    numeroContrato: '',
    plazo: null,
    referencias: null,
    tasa: null,
    vehiculo: null
});

class Contrato extends ContratoRecord {
    static prepareForParse (contrato) {
        contrato.monto = parseInt(contrato.monto, 10);
        contrato.plazo = parseInt(contrato.plazo, 10);
        contrato.tasa = parseInt(contrato.tasa, 10);

        contrato.fechaContrato = new Date(parseInt(contrato.fechaContrato.anio, 10),
                                        parseInt(contrato.fechaContrato.mes, 10),
                                        parseInt(contrato.fechaContrato.dia, 10)
        );

        contrato.vehiculo = new VehiculoObject(VehiculoRecord.prepareForParse(contrato.vehiculo));
        contrato.cliente = new ClienteObject(ClienteRecord.prepareForParse(contrato.cliente));

        return contrato;
    }

    constructor (definition) {
        definition = definition || {};

        definition.id = definition.id || definition.objectId;

        definition.fechaContrato = {};

        definition.vehiculo = new VehiculoRecord(definition.vehiculo);
        definition.cliente = new ClienteRecord(definition.cliente);

        super(definition);
    }

    toEditable () {
        return {
            id: this.id,
            cliente: this.cliente.toEditable(),
            fechaContrato: this.fechaContrato,
            monto: this.monto,
            numeroContrato: this.numeroContrato,
            plazo: this.plazo,
            referencias: this.referencias || [],
            tasa: this.tasa,
            vehiculo: this.vehiculo.toEditable()
        };
    }
}

module.exports = Contrato;
