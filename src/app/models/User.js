import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class users extends Model {
  static init(sequelize) {
    // Chamar init da classe Model
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    // Criptografar antes de usuario ser inserido no banco de dados
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.files, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  // Verificar com bcrypt se a senha como parametro bate com a hash para criar sessão
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
export default users;
