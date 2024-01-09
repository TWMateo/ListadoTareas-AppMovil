//Importa el paquete
const pgPromise = require('pg-promise')
const config = {
    host: 'ep-noisy-hat-22730248.us-east-2.aws.neon.fl0.io',
    port: '5432',
    database: 'listado-tareas',
    user: 'fl0user',
    password: 'XsVlWT8I2uri',
    ssl: {
        rejectUnauthorized: false
    }
}
//Instancia como objeto
const pgp = pgPromise({})
const db = pgp(config)

console.log('Conexion ok')
db.any('Select * from tareas')
     .then(res => { console.table(res) })

//Permite exportar la variable a otros archivos
exports.db = db