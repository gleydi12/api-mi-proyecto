const mysql = require ('mysql2'); // usar la libreria 


// configuracion de la base de datos 
const config =mysql.createConnection({
host: '127.0.0.1',
user:'user_sistema',
password:'gleydi',
database:'proyecto',
insecureAuth : true

});

module.exports = config; //Exportar la configuracion