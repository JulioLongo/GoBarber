import Sequelize, { Model } from 'sequelize';

class appointments extends Model {
  static init(sequelize) {
    // Chamar init da classe Model
    super.init(
      {
        date: Sequelize.STRING,
        canceled_at: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.users, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.users, { foreignKey: 'provider_id', as: 'provider' });
  }
}
export default appointments;
