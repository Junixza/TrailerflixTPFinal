const sequelize = require('../database/databases');
const Categoria = require('./categoria');
const Genero = require('./genero');
const Actor = require('./actor');
const Temporada = require('./temporada');
const Capitulo = require('./capitulo');
const Reparto = require('./reparto');
const PeliculaSerie = require('./pelicula_serie');

// Relaciones

PeliculaSerie.belongsTo(Categoria, { foreignKey: 'categoria_id' });
PeliculaSerie.belongsTo(Genero, { foreignKey: 'genero_id' });

Categoria.hasMany(PeliculaSerie, { foreignKey: 'categoria_id' });
Genero.hasMany(PeliculaSerie, { foreignKey: 'genero_id' });

PeliculaSerie.hasMany(Temporada, { foreignKey: 'serie_id' });
Temporada.belongsTo(PeliculaSerie, { foreignKey: 'serie_id' });

Temporada.hasMany(Capitulo, { foreignKey: 'temporada_id' });
Capitulo.belongsTo(Temporada, { foreignKey: 'temporada_id' });

PeliculaSerie.hasMany(Reparto, { foreignKey: 'pelicula_serie_id' });
Actor.hasMany(Reparto, { foreignKey: 'actor_id' });

Reparto.belongsTo(PeliculaSerie, { foreignKey: 'pelicula_serie_id' });
Reparto.belongsTo(Actor, { foreignKey: 'actor_id' });

// Sincronizar la base de datos
sequelize.sync({ alter: true }).then(() => {
  console.log('Base de datos sincronizada');
}).catch((error) => {
  console.error('Error al sincronizar la base de datos:', error);
});
// Exportar modelos
module.exports = {
  sequelize,
  Categoria,
  Genero,
  Actor,
  Temporada,
  Capitulo,
  Reparto,
  PeliculaSerie,
};
