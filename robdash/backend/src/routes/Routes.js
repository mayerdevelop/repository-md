const express = require('express');
const router = express.Router();
const Controller = require('../controller/Controller')

router.post('/postmenu', Controller.create)
router.put('/:id',Controller.update)
router.get('/all', Controller.getAll)
router.get('/filter/:codigo', Controller.getMenu)
router.delete('/all',Controller.deleteAll)
router.delete('/:id',Controller.deleteOne)

router.post('/posttoken', Controller.createToken)
router.get('/auth/:token', Controller.authToken)
router.delete('/deletetoken/:id',Controller.deleteToken)

router.post('/postloginteste', Controller.createLoginteste)
router.post('/authlogin', Controller.authLoginteste)
router.delete('/deleteloginteste/:id',Controller.deleteLoginteste)

module.exports = router;