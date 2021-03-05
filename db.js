const Sequelize = require('sequelize');

// acá creamos la conexión a la Base de Datos
const sql = new Sequelize('chat', 'root', 'abigail', {
    host: 'localhost',
    dialect: 'mysql'
});

const Mensaje = sql.define('Mensaje', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mensaje: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Debe agregar un mensaje'
            },
            len: {
                args: [1],
                msg: 'El nombre debe ser de largo al menos 1'
            }
        }
    }
});

const User = sql.define('User', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Debe indicar un nombre'
            },
            len: {
                args: [2],
                msg: 'El nombre debe ser de largo al menos 2'
            }
        }
    },
    rol: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:"NORMAL"
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Debe indicar un email'
            },
            len: {
                args: [3],
                msg: 'El email debe ser de largo al menos 3'
            },
            isEmail: {
                msg: 'Debe ser un email válido'
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Debe indicar una contraseña'
            },
            len: {
                args: [3],
                msg: 'La contraseña debe ser de largo al menos 3'
            },
        }
    }
});

sql.sync()
    .then(() => {
        console.log('Tablas creadas (SI NO EXISTEN) ...');
});

Mensaje.belongsTo(User, {as: "emisor"});
Mensaje.belongsTo(User, {as: "receptor"});

module.exports = {
    User, 
    Mensaje
};