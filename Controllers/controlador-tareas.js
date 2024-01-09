const { db } = require('../config/cnn');

const getTareas = async (req, res) => {
    try {
        const response = await db.any('SELECT * FROM tareas;');
        return res.json({
            message: 'Ok',
            response: response
        })
    } catch (error) {
        return res.json({
            message: 'Error',
        });
    }
}

const getTareasById = async (req, res)=>{
    const {id} = req.query;
    try {
        const response = await db.any("SELECT * FROM tareas WHERE id=$1",[id]);
        return res.json({
            message:"Ok",
            response:response
        });
    } catch (error) {
        return res.json({
            message:"Error"
        })
    }
}

const postTareas = async (req, res) => {
    try {
        const { descripcion, fecha_limite, completada } = req.body;
        const response = await db.any(`INSERT INTO tareas(descripcion, fecha_limite, completada) VALUES($1,$2,$3) RETURNING id;`, [descripcion, fecha_limite, completada])
        return res.json({
            response: `Ok - Tarea creada.`,
            Id_tarea: `${response[0].id}`
        })
    } catch (error) {
        console.log(error)
        return res.json({
            message: 'Error - Al crear la tarea.'
        })
    }
}

const putTareas = async (req, res) => {
    try {
        let peticionSQL = "UPDATE tareas SET "
        const { id = 0, descripcion = '', fecha_limite = null, completada =null } = req.body;
        if (descripcion != '') {
            peticionSQL += `descripcion ='${descripcion}', `
        }
        if (fecha_limite != null) {
            peticionSQL += `fecha_limite='${fecha_limite}', `
        }
        if (completada !=null ) {
            peticionSQL += `completada=${completada} `
        }
        if (id != 0) {
            peticionSQL += `WHERE id= ${id}`
        }
        const response = await db.none(peticionSQL);
        return res.json({
            message: `Ok - Actualización correcta de la tarea ${id}.`
        })
    } catch (error) {
        console.log(error);
        return res.json({
            message: 'Error - Al actualizar la tarea'
        });
    }
}

const deleteTareas = async (req, res) =>{
    try {
        const { id } = req.query;
        const response = await db.none('DELETE FROM tareas WHERE id=$1',[id]);
        return res.json({
            message:`Ok - Tarea ${id} fue borrada.`
        })
    } catch (error) {
        res.json({
            message:'Error al borrar la tarea'
        })
    }
}

module.exports = {
    getTareas,
    postTareas,
    putTareas,
    deleteTareas,
    getTareasById
}