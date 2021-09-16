'use strict';
const mongoose = require('mongoose'); 
//conexión a la base de datos
const conexionDB = require('./lib/db.conexion');
// modelo de agentes
conexionDB();


const Announcements = require('./Models/Announcement'); 

const AnnouncementsData = require('./annoucements.inicial.json'); 

main().catch( error => console.log('Hubo un Error', error)); 

async function main() {
  await initAnnouncements(); 
  
  
  mongoose.connection.close();  
}

async function initAnnouncements() {
  //elima todos los documentos de la coleccion Announcement
const deleted = await Announcements.deleteMany();
console.log(`Removed ${deleted.deletedCount} annoucements.`); 

// crear agentes iniciales 

const annoucements_ini = await Announcements.insertMany (AnnouncementsData.annoucement);
//console.log(AnnouncementsData); 
console.log(`Create ${annoucements_ini.length} annoucements.`) 
}