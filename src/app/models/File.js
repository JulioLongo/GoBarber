import Sequelize, { Model } from 'sequelize';

class files extends Model {
  static init(sequelize) {
    // Chamar init da classe Model
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3333/files/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}
export default files;
