const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Grupo-05:grupo05@cursadanodejs.ls9ii.mongodb.net/Node-js', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conexión exitosa a MongoDB'))
.catch(error => console.error('Error al conectar a MongoDB:', error));

const superheroSchema = new mongoose.Schema({
    nombreSuperHeroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: 'Desconocido' },
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createdAt: { type: Date, default: Date.now }
}, { collection: 'Grupo-05' });

const SuperHero = mongoose.model('SuperHero', superheroSchema);

// Función para insertar un superhéroe
async function insertSuperHero() {
    const hero = new SuperHero({
        nombreSuperHeroe: 'Flash',
        nombreReal: 'Barry Allen',
        edad: 30,
        planetaOrigen: 'Tierra',
        debilidad: 'Velocidad',
        poderes: ['Super velocidad', 'Reflejos mejorados', 'Regeneración rápida'],
        aliados: ['Green Arrow', 'Superman'],
        enemigos: ['Reverse Flash', 'Zoom']
    });
    await hero.save();
    console.log('Superhéroe insertado:', hero);
}

// Función para actualizar un superhéroe
async function updateSuperHero(nombreSuperHeroe) {
    const result = await SuperHero.updateOne(
        { nombreSuperHeroe: nombreSuperHeroe },
        { $set: { edad: 31 } }  // Cambiamos la edad de Flash a 31
    );
    console.log('Resultado de la actualización:', result);
}

// Función para eliminar un superhéroe
async function deleteSuperHero(nombreSuperHeroe) {
    const result = await SuperHero.deleteOne({ nombreSuperHeroe: nombreSuperHeroe });
    console.log('Superhéroe eliminado:', result);
}

// Función para buscar superhéroes cuyo planeta de origen sea "Tierra"
async function findSuperHeroes() {
    const heroes = await SuperHero.find({ planetaOrigen: 'Tierra' });
    console.log('Superhéroes encontrados:', heroes);
}

// Función principal para ejecutar un método específico
async function main() {
    // Descomentar la funcion que se quiere habilitar
    //await insertSuperHero();       // Para insertar a Flash
    // await updateSuperHero('Flash'); // Para actualizar a Flash
    // await deleteSuperHero('Flash'); // Para eliminar a Flash
     await findSuperHeroes();        // Para buscar superhéroes
}

main(); // Llamada a la función principal
