const express = require('express');
const router = express.Router();

const CalendController = require('../controller/CalendController')

router.post('/', CalendController.create)
router.put('/:id',CalendController.update)
router.get('/all', CalendController.getAll)
router.get('/filter/:data', CalendController.getDate)
router.delete('/all',CalendController.deleteAll)
router.delete('/:id',CalendController.deleteOne)


module.exports = router;