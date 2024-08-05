const fs = require('fs');
const path = require('path');
const {
  sequelize,
  Categoria,
  Genero,
  Actor,
  Temporada,
  Capitulo,
  Reparto,
  PeliculaSerie,
} = require('./models');

async function loadData() {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'database', 'trailerflix.json'), 'utf8');
    const peliculasSeries = JSON.parse(data);

    // Desactivar verificaciones de claves foráneas
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await sequelize.sync({ force: true });
    // Reactivar verificaciones de claves foráneas
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    for (const item of peliculasSeries) {
      // Buscar o crear la categoría
      const [categoria] = await Categoria.findOrCreate({ where: { nombre: item.categoria } });

      // Buscar o crear el género
      const [genero] = await Genero.findOrCreate({ where: { nombre: item.genero } });

      // Convertir 'N/A' a null para los campos de tipo entero
      const temporadas = item.temporadas === 'N/A' ? null : parseInt(item.temporadas, 10);

      const peliculaSerie = await PeliculaSerie.create({
        titulo: item.titulo,
        poster: item.poster,
        categoria_id: categoria.id,
        genero_id: genero.id,
        tags: item.tags,
        resumen: item.resumen,
        duracion: item.duracion || null,
        temporadas: temporadas,
        trailer: item.trailer,
      });

      const actores = item.reparto.split(',').map(actor => actor.trim());
      for (const actorNombre of actores) {
        const [nombre, ...apellidoParts] = actorNombre.split(' ');
        const apellido = apellidoParts.join(' ');
        
        if (nombre) {
          const [actor] = await Actor.findOrCreate({ where: { nombre, apellido } });
          await Reparto.create({
            actor_id: actor.id,
            pelicula_serie_id: peliculaSerie.id,
          });
        }
      }
    }

    console.log('Datos cargados exitosamente');
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
}

loadData();
