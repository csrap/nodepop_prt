// 'use strict'

const Announcement = require("../Models/Announcement"); 


exports.obtener =  async  (req, res) => {
  try {

  const name = req.query.name;  
  const sale = req.query.sale; 
  const price = req.query.price;
  const photo = req.query.photo;
  const tags = req.query.tags;

  const filtro = {}; 

  if(name) {
    filtro.name= name; 
  }

  if(sale) {
    filtro.sale= sale; 
  }

  if(price) {
    filtro.price= price; 
  }

  if(photo) {
    filtro.photo= photo; 
  }

  if(tags) {
    filtro.tags = tags ; 
  }
  
  const announcements =  await Announcement.find( filtro); 
  res.json(announcements); 
} catch (error) {
  res.json(error); 
}
};

exports.agregar = async (req, res) => {
try {
  const { name, sale, price, photo,tags} = req.body; 
  

  if(name && sale && price && photo && tags) {
    const nuevoAnnouncement = new Announcement( { name, sale, price, photo, tags}); 
    await nuevoAnnouncement.save(); 

    console.log(nuevoAnnouncement); 
    res.json({msj: "documento insertado de forma satifactoria", id: nuevoAnnouncement._id }); 
  } else {
    res.json({isOK: false, msj: "Los datos son requeridos"})
  }
} catch (error) {
  res.json(error)
} }; 

exports.actualizar = async (req, res) => {
  try {
    const id = req.params.id; 
    const data = req.body;

    if (id && data) {
      await Announcement.findByIdAndUpdate(id, data)
      res.json("Registro Actualizado."); 
    } else {
      res.json( { msj:" Datos insuficientes" }); 
    }
  } catch (error) {
    res.json(error); 
  }
  
  }

exports.eliminar = async (req, res) => {
    try {
      const _id = req.params.id; 
    console.log(_id); 
    await Announcement.deleteOne({ _id : _id} );
    res.status(200).json({ msj: "Dato borrado de forma satifactoria", isOk: true}); 
    } catch (error) {
      res.status(500).json(error); 
    }
    }