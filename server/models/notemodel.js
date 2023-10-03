'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    static associate(models) {}
  }
  Note.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    pinned: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'notes',
  });
  return Note;
};