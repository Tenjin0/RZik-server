var express = require('express');
var router = express.Router();
var user = require('../controllers/usercontroller.js');
var verify = require('../middlewares/verify');
var role = require('../server/enum/role');

//test
router.get('/test', verify.verifyRole([role.USER]), user.test);

//Modifier
router.put('/', verify.verifyRole([role.USER, role.ADMINISTRATOR]), user.edit);

//Lister
router.get('/all', verify.verifyRole([role.ADMINISTRATOR]), user.list);

//Recherche par id
router.get('/:id', verify.verifyRole([role.USER, role.ADMINISTRATOR]), user.findById);

//Recherche par nom
router.get('/name/:name', verify.verifyRole([role.USER, role.ADMINISTRATOR]), user.findByName);

//Activer / Desactiver compte
router.put('/:activate', verify.verifyRole([role.USER, role.ADMINISTRATOR]), user.activate);

//Suppression compte !! définitive
router.delete('/:id', verify.verifyRole([role.USER, role.ADMINISTRATOR]), user.delete);

module.exports = router;