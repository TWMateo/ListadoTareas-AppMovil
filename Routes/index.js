const express = require('express');
const router = express.Router();

const cors = require('cors');
router.use(cors());

const { getTareas, postTareas, putTareas, deleteTareas, getTareasById } = require('../Controllers/controlador-tareas');

//Rutas
router.get('/api/tarea',getTareas);
router.get('/api/tareaId',getTareasById);
router.post('/api/tarea/nueva',postTareas);
router.put('/api/tarea/actualizacion',putTareas);
router.delete('/api/tarea/borrar',deleteTareas);

module.exports = router;