const express = require('express');
const {addFruit, 
        getAllFruit,
        getFruit,
        deleteFruit,
        updateFruit} = require('../controllers/fruitController');

const router = express.Router();

router.post('/Fruit', addFruit);
router.get('/Fruit', getAllFruit);
router.get('/Fruit/:id', getFruit);
router.put('/Fruit/:id', updateFruit);
router.delete('/Fruit/:id', deleteFruit);


module.exports = {
    routes: router
}