import Sequelize, { Model } from 'sequelize'
import sequelize from '../database/database'

class Customers extends Model {}
Customers.init(
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    gender: {
      type: Sequelize.ENUM('Men', 'Women'),
      allowNull: false
    },
    is_married: Sequelize.STRING(20),
    address: Sequelize.STRING
  },
  { sequelize, modelName: 'customers' }
)

export default Customers
