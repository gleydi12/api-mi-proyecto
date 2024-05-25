//  crear un servidor con express
const express = require('express');

//incluir el cors
const cors = require('cors');

//incluir en body-parser (para procesar peticiones post)
const bodyparser = require('body-parser');

//incluir la confugutacion de coneccion a mysql
const config = require ('./config');

//crear un servidor con express 
const app = express();

//usar el cors
app.use(cors());

//usar el body-parser para procesar peticiones post
app.use(bodyparser.json())

//usar el puerto 3000
const port = 3000;

//crear una ruta por defecto
app.get('/', (req, res) => {
    res.send('hello world')
});

//crear una ruta para obtener todos los proyectos 
app.get('/proyectos', (req,res) => {
    //realizar la consulta a la base de datos
    config.query('SELECT * FROM proyectos', (err, filas) => {
        if (err) {
            console.log(err);
            res.status(500).send('error al obtener los proyectos');

        
        } else {
            res.json(filas);
        }
   
        
    });

});


//crear una ruta para obtener todos los proyectos 
app.get('/miembros', (req,res) => {
    //realizar la consulta a la base de datos
    config.query('SELECT * FROM miembros', (err, filas) => {
        if (err) {
            console.log(err);
            res.status(500).send('error al obtener los miembros');

        
        } else {
            res.json(filas);
        }
   
        
    });

});


//crear una ruta para obtener todas las actividades de un proyecto el id en la URL y luego en la query 
// cargar en esta misma ruta los miembrosde de un proyecto
app.get('/proyecto/:id/actividades', (req,res) => {
    //realizar la consulta a la base de datos
    config.query('SELECT * FROM actividades WHERE proyecto_id = ?', req.params.id, (err, filas) => {
        if (err) {
            console.log(err);
            res.status(500).send('error al obtener las actividades');       
        } else {
            res.json(filas);
        }       
    });

});

//Store a project in the database
app.post('/proyecto', (req, res) => {
    // Get the data from the request
    const data = req.body;
    console.log(data);

    // Perform the query
    config.query('INSERT INTO proyectos SET ?', data, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al guardar el proyecto');
        } else {
            // Return the response
            res.json({
                id: result.insertId,
                ...data
            });
        }
    });
});
//iniciar el servidor 
app.listen(port, () => {
    console.log (`server running on port ${port}`)

});
