var express = require('express');
var router = express.Router();
var user = require('../controllers/usercontroller.js');
var verify = require('../middlewares/verify');

//Modifier
router.put('/:id', verify.verifyRole, user.edit);

/**
 * 
 * L'admin et l'utilisteur ont access a des fonctionnalités de désactivation de compte et suppression
 * 
 * 
 */

//router.put('/disable/', verifyRole, user.disable);

//Lister
router.get('/all', verify.verifyRole, user.list);

//Recherche par id
router.get('/:id', verify.verifyRole, user.findById);

//Recherche par nom
router.get('/name/:name', verify.verifyRole, user.findByName);

//Activer / Desactiver compte
router.put('/:status', verify.verifyRole, user.status);

router.get('/:test', verify.verifyRole, user.test);

module.exports = router;