'use strict';

const mongoose = require('mongoose');

const conexionDB = async () => {
  try {
    const DB = await mongoose.connect('mongodb://localhost:27017/announcements');
    console.log("Conexion de forma satisfactoria", DB.connection.name);
  } catch (error) {
    console.log(error);
  }
}

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useCreateIndex: true,
  useNewUrlParser: true,
  userUnifiedTopology: true

})

module.exports = conexionDB;