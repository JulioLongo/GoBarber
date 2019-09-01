import Sequelize from 'sequelize';

import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Pega conexao que esta em database.js
    this.connection = new Sequelize(databaseConfig);

    // Percorrer pelos modelos
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
