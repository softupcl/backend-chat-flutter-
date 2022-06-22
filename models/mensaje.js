const { Schema, model } = require('mongoose');

const MensajeSchema = Schema({
    de: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    },
    para: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    },
    mensaje: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

//Sobre escribe un metodo
MensajeSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    return object;
});

module.exports = model('Mensaje', MensajeSchema);