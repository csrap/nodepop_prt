const { Router } = require("express");
const ctrAnn = require("E:/Bootcamp_Keepcoding/m10-Desarrollo-node-avanzado/nodepop_prt/NodeApi/controllers/announcement.controllers");

const routerAnnouncement = Router();


routerAnnouncement.get("/", ctrAnn.obtener);

routerAnnouncement.get("/:price1/:price2", ctrAnn.priceFilter);

routerAnnouncement.post('/', ctrAnn.agregar);

routerAnnouncement.put('/:id', ctrAnn.actualizar);

routerAnnouncement.delete('/:id', ctrAnn.eliminar);

module.exports = routerAnnouncement;