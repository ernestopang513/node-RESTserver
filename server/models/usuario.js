const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

let Schema = mongoose.Schema;
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'],

    },
    email: {
        unique: true,
        type: 'String',
        required: [true, 'El correo es necesario']

    },
    password: {
        type: String,
        required: [true, 'El password es necesario']
    },
    img: {
        type: String,
        requied: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos

    },
    estado: {
        type: Boolean,
        // required: true,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },

});
usuarioSchema.methods.toJSON = function() {
    let user = this;

    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}




usuarioSchema.plugin(uniqueValidator, { message: '{PATH} Debe de ser único' });


module.exports = mongoose.model('Usuario', usuarioSchema);