"use server";
import sequelize from '../lib/database';
import { Model, DataTypes } from 'sequelize';

class Author extends Model {
  public id!: number;
  public name!: string;
  public biography!: string;
  public birthdate!: Date;
  public created_at!: Date;
  public updated_at!: Date;
}

Author.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  biography: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  sequelize,
  tableName: 'authors',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default Author;