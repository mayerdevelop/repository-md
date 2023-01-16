const express = require('express');
const router = express.Router();

const AlunosController = require('../controller/AlunosController')

router.post('/', AlunosController.create)
router.put('/:id',AlunosController.update)
router.get('/all', AlunosController.getAll)
router.get('/filter/:id', AlunosController.getAluno)
router.delete('/all',AlunosController.deleteAll)
router.delete('/:id',AlunosController.deleteOne)

router.post('/postlist', AlunosController.createLists)
router.get('/getlists/all', AlunosController.getAllLists)
router.get('/filterlist/:id', AlunosController.getList)

router.post('/postlogin', AlunosController.createLogin)
router.get('/auth/:tokenvalid', AlunosController.authLogin)
router.delete('/deletelogin/:id',AlunosController.deleteLogin)

module.exports = router;