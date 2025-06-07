"use server";
import sequelize from '../lib/database';
import { Model, DataTypes } from 'sequelize';

class Book extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public published_date!: Date;
  public created_at!: Date;
  public updated_at!: Date;
  public author_id!: number;
}

Book.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  published_date: {
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
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'authors',
      key: 'id'
    }
  }
}, {
  sequelize,
  tableName: 'books',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default Book;