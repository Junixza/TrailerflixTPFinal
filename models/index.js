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
Temporada.belongsTo(PeliculaSerie, { foreignKey: 'serie_id' });
Capitulo.belongsTo(Temporada, { foreignKey: 'temporada_id' });
Reparto.belongsTo(Actor, { foreignKey: 'actor_id' });
Reparto.belongsTo(PeliculaSerie, { foreignKey: 'pelicula_serie_id' });

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
