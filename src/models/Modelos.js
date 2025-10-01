import { Sequelize } from 'sequelize';
import AnimalModel from './Animal.js';
import TutorModel from './Usuario.js';
import QuestionarioModel from './Questionario.js';
import PedidoAdocaoModel from './PedidoAdocao.js';
import DoacaoModel from './Doacao.js';
import sequelize from '../config/database.js';

export const Animal = AnimalModel(sequelize);
export const Tutor = TutorModel(sequelize);
export const Questionario = QuestionarioModel(sequelize);
export const PedidoAdocao = PedidoAdocaoModel(sequelize);
export const Doacao = DoacaoModel(sequelize);

Tutor.hasOne(Questionario, { foreignKey: 'id_tutor' });
Questionario.belongsTo(Tutor, { foreignKey: 'id_tutor' });

Tutor.hasMany(PedidoAdocao, { foreignKey: 'id_tutor' });
PedidoAdocao.belongsTo(Tutor, { foreignKey: 'id_tutor' });

Animal.hasMany(PedidoAdocao, { foreignKey: 'id_animal' });
PedidoAdocao.belongsTo(Animal, { foreignKey: 'id_animal' });

PedidoAdocao.hasMany(Doacao, { foreignKey: 'id_pedido_adocao' });
Doacao.belongsTo(PedidoAdocao, { foreignKey: 'id_pedido_adocao' });

await sequelize.sync();

export default { sequelize, Animal, Tutor, Questionario, PedidoAdocao, Doacao };
