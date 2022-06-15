const express = require('express');
const router = express.Router();

const CalendController = require('../controller/CalendController')

router.post('/', CalendController.create)
router.put('/:id',CalendController.update)
router.get('/all', CalendController.getAll)
router.get('/filter/:data', CalendController.getDate)
router.delete('/all',CalendController.deleteAll)
router.delete('/:id',CalendController.deleteOne)

router.post('/postparam', CalendController.createParam)
router.get('/getparam/all', CalendController.getAllParam)
router.delete('/deleteparam/all',CalendController.deleteAllParam)

router.post('/postlogin', CalendController.createLogin)
router.get('/auth/:tokenvalid', CalendController.authLogin)
router.delete('/deletelogin/:id',CalendController.deleteLogin)

module.exports = router;