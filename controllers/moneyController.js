'use strict';
const { Requester } = require('cote');

const requester = new Requester({ name: 'nodeapi-money-controller' });

class MoneyController {
  //GET //api/money (desde. hacia, cantidad); 
  index(req, res, next) {
    const { desde, hacia, cantidad } = req.params;

    //pedir a los microservicios que haga la conversión 
    requester.send({
      type: 'convertir-img',
      desde,
      hacia,
      cantidad
    }, resultado => {
      res.json({ result: resultado });
    });

  }
}

module.exports = MoneyController;