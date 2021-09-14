const { Router } = require("express"); 
const ctrAnn = require("/Bootcamp_Keepcoding/practica_node/nodepop/controllers/announcement.controllers"); 

const routerAnnouncement  = Router(); 


routerAnnouncement.get("/", ctrAnn.obtener);

routerAnnouncement.post('/', ctrAnn.agregar);

routerAnnouncement.put('/:id', ctrAnn.actualizar);

routerAnnouncement.delete('/:id', ctrAnn.eliminar); 

module.exports = routerAnnouncement; 