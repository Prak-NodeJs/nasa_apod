import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/config';

export const Apod = sequelize.define('Apod', {
    responseId:{
        type:DataTypes.STRING,
        allowNull:false
    },
    copyright:{
        type:DataTypes.STRING,
        allowNull:true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    explanation: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    hdUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mediaType:{
      type:DataTypes.STRING,
      allowNull:false
    },
    serviceVersion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  });